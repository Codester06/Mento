import React, { useState, Children, useRef, useLayoutEffect, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "./Stepper.css";

// Add this to your Stepper.css file or replace your existing CSS with this
export default function Stepper({
  children,
  initialStep = 1,
  onStepChange = () => { },
  onFinalStepCompleted = () => { },
  stepCircleContainerClassName = "",
  stepContainerClassName = "",
  contentClassName = "",
  footerClassName = "",
  backButtonProps = {},
  nextButtonProps = {},
  backButtonText = "Back",
  nextButtonText = "Continue",
  disableStepIndicators = false,
  renderStepIndicator,
  ...rest
}) {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [direction, setDirection] = useState(0);
  const stepsArray = Children.toArray(children);
  const totalSteps = stepsArray.length;
  const isCompleted = currentStep > totalSteps;
  const isLastStep = currentStep === totalSteps;
  const stepIndicatorRowRef = useRef(null);

  // Scroll active step into view whenever current step changes
  useEffect(() => {
    if (stepIndicatorRowRef.current) {
      const activeStep = stepIndicatorRowRef.current.querySelector(
        `.step-indicator:nth-child(${currentStep * 2 - 1})`
      );
      if (activeStep) {
        const rowRect = stepIndicatorRowRef.current.getBoundingClientRect();
        const stepRect = activeStep.getBoundingClientRect();
        const isFullyVisible = 
          stepRect.left >= rowRect.left && 
          stepRect.right <= rowRect.right;

        if (!isFullyVisible) {
          activeStep.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center"
          });
        }
      }
    }
  }, [currentStep]);

  const updateStep = (newStep) => {
    setCurrentStep(newStep);
    if (newStep > totalSteps) {
      onFinalStepCompleted();
    } else {
      onStepChange(newStep);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setDirection(-1);
      updateStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (!isLastStep) {
      setDirection(1);
      updateStep(currentStep + 1);
    }
  };

  const handleComplete = () => {
    setDirection(1);
    updateStep(totalSteps + 1);
  };

  return (
    <div className="outer-container" {...rest}>
      <div 
        className={`step-circle-container ${stepCircleContainerClassName}`} 
        style={{ 
          border: "1px solid #222", 
          width: "100%", 
          maxWidth: "48rem" // Increased width
        }}
      >
        <div 
          ref={stepIndicatorRowRef}
          className={`step-indicator-row ${stepContainerClassName} ${totalSteps > 5 ? 'many-steps' : ''}`}
          style={{ padding: "2.5rem 2rem" }} // Increased padding
        >
          {stepsArray.map((_, index) => {
            const stepNumber = index + 1;
            const isNotLastStep = index < totalSteps - 1;
            return (
              <React.Fragment key={stepNumber}>
                {renderStepIndicator ? (
                  renderStepIndicator({
                    step: stepNumber,
                    currentStep,
                    onStepClick: (clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    },
                  })
                ) : (
                  <StepIndicator
                    step={stepNumber}
                    disableStepIndicators={disableStepIndicators}
                    currentStep={currentStep}
                    onClickStep={(clicked) => {
                      setDirection(clicked > currentStep ? 1 : -1);
                      updateStep(clicked);
                    }}
                  />
                )}
                {isNotLastStep && (
                  <StepConnector isComplete={currentStep > stepNumber} />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <StepContentWrapper
          isCompleted={isCompleted}
          currentStep={currentStep}
          direction={direction}
          className={`step-content-default ${contentClassName}`}
          style={{ minHeight: "200px" }} // Add minimum height
        >
          {stepsArray[currentStep - 1]}
        </StepContentWrapper>

        {!isCompleted && (
          <div 
            className={`footer-container ${footerClassName}`}
            style={{ 
              paddingLeft: "3rem", 
              paddingRight: "3rem", 
              paddingBottom: "3rem" 
            }} // Increased padding
          >
            <div 
              className={`footer-nav ${currentStep !== 1 ? "spread" : "end"}`}
              style={{ marginTop: "3.5rem" }} // Increased margin
            >
              {currentStep !== 1 && (
                <button
                  onClick={handleBack}
                  className={`back-button ${currentStep === 1 ? "inactive" : ""}`}
                  style={{ 
                    fontSize: "1rem", 
                    padding: "0.78rem 1.25rem",
                    borderRadius: "0.5rem"
                  }} // Increased size
                  {...backButtonProps}
                >
                  {backButtonText}
                </button>
              )}
              <button
                onClick={isLastStep ? handleComplete : handleNext}
                className="next-button"
                style={{ 
                  fontSize: "1rem", 
                  padding: "0.78rem 1.25rem"
                }} // Increased size
                {...nextButtonProps}
              >
                {isLastStep ? "Complete" : nextButtonText}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StepContentWrapper({ isCompleted, currentStep, direction, children, className, style }) {
  const [parentHeight, setParentHeight] = useState(0);

  return (
    <motion.div
      className={className}
      style={{ 
        position: "relative", 
        overflow: "hidden",
        ...style
      }}
      animate={{ height: isCompleted ? 0 : parentHeight }}
      transition={{ type: "spring", duration: 0.4 }}
    >
      <AnimatePresence initial={false} mode="sync" custom={direction}>
        {!isCompleted && (
          <SlideTransition key={currentStep} direction={direction} onHeightReady={(h) => setParentHeight(h)}>
            {children}
          </SlideTransition>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SlideTransition({ children, direction, onHeightReady }) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (containerRef.current) onHeightReady(containerRef.current.offsetHeight);
  }, [children, onHeightReady]);

  return (
    <motion.div
      ref={containerRef}
      custom={direction}
      variants={stepVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.4 }}
      style={{ position: "absolute", left: 0, right: 0, top: 0 }}
    >
      {children}
    </motion.div>
  );
}

// Updated animation variants to enter from right
const stepVariants = {
  enter: (dir) => ({
    x: dir >= 0 ? "100%" : "-100%", // Enter from right when moving forward
    opacity: 0,
  }),
  center: {
    x: "0%",
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir >= 0 ? "-50%" : "50%", // Updated exit animation to match new direction
    opacity: 0,
  }),
};

export function Step({ children }) {
  return (
    <div 
      className="step-default" 
      style={{ 
        paddingLeft: "3rem", 
        paddingRight: "3rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem"
      }} // Increased padding
    >
      {children}
    </div>
  );
}

function StepIndicator({ step, currentStep, onClickStep, disableStepIndicators }) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  const handleClick = () => {
    if (step !== currentStep && !disableStepIndicators) onClickStep(step);
  };

  return (
    <motion.div 
      onClick={handleClick} 
      className={`step-indicator ${status}`} 
      animate={status} 
      initial={false}
      style={{
        scrollMargin: "2rem" // Added for smoother scrolling
      }}
    >
      <motion.div
        variants={{
          inactive: { scale: 1, backgroundColor: "#222", color: "#a3a3a3" },
          active: { scale: 1, backgroundColor: "#00d8ff", color: "#00d8ff" },
          complete: { scale: 1, backgroundColor: "#00d8ff", color: "#3b82f6" },
        }}
        transition={{ duration: 0.3 }}
        className="step-indicator-inner"
        style={{
          height: "2.3rem", // Increased size
          width: "2.3rem", // Increased size
        }}
      >
        {status === "complete" ? (
          <CheckIcon className="check-icon" style={{ height: "1.5rem", width: "1.5rem" }} />
        ) : status === "active" ? (
          <div className="active-dot" style={{ height: "1.25rem", width: "1.25rem" }} />
        ) : (
          <span className="step-number" style={{ fontSize: "1.25rem" }}>{step}</span>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepConnector({ isComplete }) {
  const lineVariants = {
    incomplete: { width: 0, backgroundColor: "transparent" },
    complete: { width: "100%", backgroundColor: "#00d8ff" },
  };

  return (
    <div 
      className="step-connector"
      style={{
        marginLeft: "0.75rem",
        marginRight: "0.75rem",
        height: "0.25rem",
        flex: "0 0 2.5rem",
        minWidth: "1.5rem",
        maxWidth: "4rem",
        borderRadius: "0.5rem"
      }} // Increased size
    >
      <motion.div
        className="step-connector-inner"
        variants={lineVariants}
        initial={false}
        animate={isComplete ? "complete" : "incomplete"}
        transition={{ duration: 0.4 }}
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg {...props} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.1, type: "tween", ease: "easeOut", duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}