import React, { useState, useEffect, useMemo, memo } from "react";
import styles from "./depressionTest.module.css";
import { postDataBS } from "../../utils/awsService";
import { EmailFormat, GenerateEmailHTML } from "../mail/mailformat";
// import { gmail_sendEmail } from "../../utils/mail_service";
import ReactDOMServer from "react-dom/server";
const AnxietyDisorderTest = () => {
  const quizData = [
    {
      question: "Feeling nervous, anxious, or on edge.",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 1,
    },
    {
      question: "Not being able to stop or control worrying",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 2,
    },
    {
      question: "Worrying too much about different things",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 3,
    },
    {
      question: "Trouble relaxing.",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 4,
    },
    {
      question: "Being so restless that it's hard to sit still.",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 5,
    },
    {
      question: "Becoming easily annoyed or irritable.",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 6,
    },
    {
      question: "Feeling afraid as if something awful might happen",
      options: [
        { text: "Not at all", score: 0 },
        { text: "Several days", score: 1 },
        { text: "More than half the days", score: 2 },
        { text: "Nearly everyday", score: 3 },
      ],
      answer: null,
      index: 7,
    },
  ];

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [answerValues, setAnswerValues] = useState(
    Array(quizData.length).fill(null)
  );
  const [showResult, setShowResult] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Calculate total possible score
  const maxPossibleScore = 21; // 7 questions with 3 points

  // Calculate user's score
  const calculateScore = () => {
    return answerValues.reduce((sum, value) => sum + (value || 0), 0);
  };

  // Calculate score percentage
  const scorePercentage = () => {
    const score = calculateScore();
    return (score / maxPossibleScore) * 100;
  };

  useEffect(() => {
    if (showResult) {
      // Start animation after results are shown
      setTimeout(() => {
        setAnimateProgress(true);
      }, 300);
    }
  }, [showResult]);

  // Get interpretation based on score
  const getInterpretation = () => {
    const score = calculateScore();

    if (score >= 0 && score <= 4) {
      return {
        title: "Minimal Anxiety",
        description:
          "Your results indicate minimal anxiety symptoms. This is within the normal range for most individuals.",
        colorClass: styles.excellent,
      };
    } else if (score >= 5 && score <= 9) {
      return {
        title: "Mild Anxiety",
        description:
          "Your results suggest mild anxiety symptoms. Consider monitoring your stress levels and implementing self-care strategies.",
        colorClass: styles.good,
      };
    } else if (score >= 10 && score <= 14) {
      return {
        title: "Moderate Anxiety",
        description:
          "Your results indicate moderate anxiety symptoms. Consider discussing these symptoms with a healthcare provider.",
        colorClass: styles.moderate,
      };
    } else if (score >= 15 && score <= 19) {
      return {
        title: "Severe Anxiety",
        description:
          "Your results suggest severe anxiety symptoms. Consultation with a mental health professional is recommended.",
        colorClass: styles.needsAttention,
      };
    } else if (score >= 20 && score <= 21) {
      return {
        title: "Extreme Anxiety",
        description:
          "Your results indicate extremely severe anxiety symptoms. Prompt consultation with a mental health professional is strongly recommended.",
        colorClass: styles.severe,
      };
    } else {
      return {
        title: "Invalid Score",
        description:
          "Unable to calculate a valid score. Please ensure all questions are answered.",
        colorClass: styles.neutral,
      };
    }
  };

  // Handler for selecting an answer
  const handleAnswerSelect = (option, index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = option.text;
    setAnswers(newAnswers);

    const newValues = [...answerValues];
    newValues[currentQuestion] = option.score;
    setAnswerValues(newValues);

    // Set transitioning state to trigger animation
    setTransitioning(true);

    // Auto advance to next question after a short delay
    setTimeout(() => {
      if (currentQuestion < quizData.length - 2) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
      // Reset transitioning state after moving to next question
      setTransitioning(false);
    }, 500); // 500ms delay before changing question
  };

  // Navigation handlers
  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Reset quiz
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(Array(quizData.length).fill(null));
    setAnswerValues(Array(quizData.length).fill(null));
    setShowResult(false);
    setFormSubmitted(false);
    setAnimateProgress(false);
    setSubmitError(null);
  };

  // Prepare the complete assessment data
  const prepareAssessmentData = () => {
    const score = calculateScore();
    const interpretation = getInterpretation().title;

    // Collect detailed responses in the format expected by the details view
    const detailedResponses = quizData.map((question, index) => ({
      question: question.question,
      answer: answers[index] || "No response",
    }));

    // Create the data object in the structure expected by the panel components
    return {
      fullName: name,
      email: email,
      submissionDate: new Date().toISOString(),
      score: score,
      responses: detailedResponses,
      comments: "", // Adding this field to match the expected structure in details view
      // Include the detailed data to maintain all the information
      detailedAssessment: {
        totalScore: score,
        maxPossibleScore: maxPossibleScore,
        interpretationCategory: interpretation,
        detailedResponses: quizData.map((question, index) => ({
          questionIndex: question.index,
          questionText: question.question,
          answerText: answers[index],
          answerScore: answerValues[index] || 0,
        })),
      },
    };
  };

  // Handle email submission and data saving
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Collect all assessment data
      const assessmentData = prepareAssessmentData();

      // Send data to database using the postData utility
      const response = await postDataBS("/anxietytest", assessmentData);
      setFormSubmitted(true);
      console.log(response);
      const email_data = Object.assign(
        {},
        {
          name: assessmentData.fullName,

          subject: "Confirmation Mail For Your Session",
          email: assessmentData.email,
        }
      );

      const email_content = ReactDOMServer.renderToStaticMarkup(
        <EmailFormat {...email_data} />
      );

      const email_body = GenerateEmailHTML(email_content);

      // try {
      //   // Send email using Gmail service
      //   const sendEmailResponse = await gmail_sendEmail("send_mail", email_data.email, email_data.subject, email_body);

      //   // Log success or error message based on response
      //   console.log(sendEmailResponse.success ? "✅ Email sent successfully!" : `❌ Error: ${sendEmailResponse.error}`);
      // } catch (error) {
      //   // Catch and log any unexpected errors during the email sending process
      //   console.error("❌ Error sending email:", error.message);
      // }
    } catch (error) {
      console.error("Error submitting assessment data:", error);
      setSubmitError(
        "There was an error submitting your data. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // Function to determine option style based on selection
  const getOptionClass = (option) => {
    const isSelected = answers[currentQuestion] === option.text;

    if (transitioning && isSelected) {
      return `${styles.option} ${styles.selected} ${styles.transitioning}`;
    }

    return isSelected ? `${styles.option} ${styles.selected}` : styles.option;
  };

  // Circular progress component
  const CircularProgress = memo(({ percentage }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = useMemo(() => {
      return animateProgress
        ? circumference - (percentage / 100) * circumference
        : circumference;
    }, [percentage, animateProgress]);

    // Determine color based on PHQ-9 score ranges
    const getColorClass = () => {
      const score = calculateScore();
      if (score >= 0 && score <= 4) return styles.excellentColor;
      if (score >= 5 && score <= 9) return styles.goodColor;
      if (score >= 10 && score <= 14) return styles.moderateColor;
      if (score >= 15 && score <= 19) return styles.needsAttentionColor;
      if (score >= 20 && score <= 27) return styles.severeColor;
      return styles.neutralColor; // Fallback for invalid scores
    };

    return (
      <div className={styles.circularProgress}>
        {/* Background circle */}
        <svg className={styles.progressSvg} viewBox="0 0 180 180">
          <circle
            cx="90"
            cy="90"
            r={radius}
            className={styles.progressBackground}
          />
          {/* Progress circle */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            className={`${styles.progressCircle} ${getColorClass()} ${
              animateProgress ? styles.animate : ""
            }`}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 90 90)"
          />
        </svg>
        {/* Score text */}
        <div className={styles.progressText}>
          <span className={`${styles.percentage} ${getColorClass()}`}>
            {animateProgress ? calculateScore() : 0}
          </span>
          <span className={styles.scoreLabel}>Anxiety Score</span>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className={styles.assessmentBanner}>
        <div
          className={[styles.bannerDecoration, styles.decoration1].join(" ")}
        ></div>
        <div
          className={[styles.bannerDecoration, styles.decoration2].join(" ")}
        ></div>

        <div className={styles.bannerContent}>
          <div className={styles.bannerHeader}>
            <h1 className={styles.SelfBannerTitle}>
              Anxiety Disorder Self Assessment
            </h1>
            <p className={styles.SelfBannerTitle}>
              A confidential screening tool to help evaluate your anxiety
              symptoms.
            </p>
          </div>

          <div className={styles.bannerInfo}>
            <p className={styles.bannerDisclaimer}>
              This assessment is based on the Generalized Anxiety Disorder
              (GAD-7) test. It is a screening tool designed to help identify
              anxiety symptoms that may warrant professional attention
            </p>
          </div>
        </div>
      </div>

      <div className={styles.wellnessQuiz}>
        {!showResult ? (
          <div className={styles.quizContainer}>
            <div className="decorative-circles-MN">
              <div className="circle-1-MN"></div>
              <div className="circle-2-MN"></div>
            </div>

            <div className={styles.quizHeader}>
              <p className={styles.questionCounter}>
                Question {currentQuestion + 1} of {quizData.length}
              </p>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${
                      ((currentQuestion + 1) / quizData.length) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div
              className={`${styles.questionContainer} ${
                transitioning ? styles.fadeOut : styles.fadeIn
              }`}
            >
              <h2 className={styles.questionText}>
                {quizData[currentQuestion].question}
              </h2>

              <div className={styles.optionsContainer}>
                {quizData[currentQuestion].options.map((option, index) => (
                  <div
                    key={index}
                    className={getOptionClass(option)}
                    onClick={() => handleAnswerSelect(option, index)}
                  >
                    <span>{option.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.navigationButtons}>
              <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                className={
                  currentQuestion === 0
                    ? `${styles.buttonPrevious} ${styles.disabled}`
                    : styles.buttonPrevious
                }
              >
                Previous
              </button>

              {currentQuestion === quizData.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className={styles.buttonNext}
                >
                  Complete
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className={styles.buttonPrevious}
                >
                  Skip
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.resultsContainer}>
            <h2 className={styles.resultsTitle}>Assessment Complete</h2>
            <p className={styles.resultsSubtitle}>
              Thank you for completing this Anxiety Disorder screening.
            </p>

            <div className={styles.resultsContent}>
              {/* Left side: Circular progress */}
              <div className={styles.resultsProgress}>
                <CircularProgress percentage={scorePercentage()} />
              </div>

              {/* Right side: Score interpretation */}
              <div className={styles.resultsInterpretation}>
                <h3
                  className={`${styles.interpretationTitle} ${
                    getInterpretation().colorClass
                  }`}
                >
                  {getInterpretation().title}
                </h3>
                <p className={styles.interpretationDescription}>
                  {getInterpretation().description}
                </p>
                <div className={styles.scoreDetails}>
                  <p>
                    Score: {calculateScore()} out of {maxPossibleScore} points
                  </p>
                </div>
                <div className={styles.disclaimer}>
                  <p>
                    This is a clinical tool for assessing anxiety symptoms.
                    However, results should be discussed with a qualified
                    healthcare professional for accurate interpretation based on
                    your full health history and current condition.
                  </p>
                </div>
              </div>
            </div>

            {/* Blurred section with email capture form */}
            <div className={styles.detailedResults}>
              {formSubmitted ? (
                <div className={styles.thankyouMN}>
                  <div className={styles.checkiconMN}>✓</div>
                  <h2 className={styles.formtitleMN}>Thank You!</h2>
                  <p className="form-subtitle-MN">
                    Your mental wellness matters. You're not alone in facing
                    anxiety—support is available.
                  </p>
                  <p className="form-subtitle-MN">
                    Your Detailed Report Has Been Successfully Sent To Your
                    Provided Email.
                  </p>
                </div>
              ) : (
                /* Overlay form */
                <div className={styles.formOverlay}>
                  <div className={styles.formContainer}>
                    <h3 className={styles.formTitle}>Get Your Full Report</h3>
                    <p className={styles.formSubtitle}>
                      Enter your details to receive a personalized assessment
                      report with detailed insights and recommendations.
                    </p>

                    {submitError && (
                      <p className={styles.errorMessage}>{submitError}</p>
                    )}

                    <form onSubmit={handleSubmit} className={styles.emailForm}>
                      <div className={styles.formField}>
                        <label htmlFor="name" className={styles.formLabel}>
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className={styles.formInput}
                          placeholder="Your name"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div className={styles.formField}>
                        <label htmlFor="email" className={styles.formLabel}>
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className={styles.formInput}
                          placeholder="Your email address"
                          disabled={isSubmitting}
                        />
                      </div>

                      <button
                        type="submit"
                        className={styles.formButton}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Processing..."
                          : "Get My Detailed Report"}
                      </button>

                      <p className={styles.privacyNote}>
                        We respect your privacy and will never share your
                        information with third parties.
                      </p>
                    </form>
                  </div>
                </div>
              )}
            </div>

            <button onClick={resetQuiz} className={styles.resetButton}>
              Take Assessment Again
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AnxietyDisorderTest;
