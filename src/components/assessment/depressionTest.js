import React, { useState, useEffect ,useMemo,memo} from 'react';
import styles from './depressionTest.module.css';

const DepressionTest = () => {
  const quizData = [
    {
      question: "How often do you feel sad?",
      options: [
        { text: "I do not feel sad.", score: 0 },
        { text: "I feel sad.", score: 1 },
        { text: "I am sad all the time and I can't snap out of it.", score: 2 },
        { text: "I am so sad and unhappy that I can't stand it.", score: 3 }
      ],
      answer: null,
      index: 1 
    },
    {
      question: "How do you feel about the future?",
      options: [
        { text: "I am not particularly discouraged about the future.", score: 0 },
        { text: "I feel discouraged about the future.", score: 1 },
        { text: "I feel I have nothing to look forward to.", score: 2 },
        { text: "I feel the future is hopeless and that things cannot improve.", score: 3 }
      ],
      answer: null,
      index: 2 
    },
    {
      question: "How do you feel about your past failures?",
      options: [
        { text: "I do not feel like a failure.", score: 0 },
        { text: "I feel I have failed more than the average person.", score: 1 },
        { text: "As I look back on my life, all I can see is a lot of failures.", score: 2 },
        { text: "I feel I am a complete failure as a person.", score: 3 }
      ],
      answer: null,
      index: 3 
    },
    {
      question: "Do you often feel guilty?",
      options: [
        { text: "I don't feel particularly guilty.", score: 0 },
        { text: "I feel guilty a good part of the time.", score: 1 },
        { text: "I feel quite guilty most of the time.", score: 2 },
        { text: "I feel guilty all of the time.", score: 3 }
      ],
      answer: null,
      index: 5
    },
    {
      question: "Do you feel like you are being punished?",
      options: [
        { text: "I don't feel I am being punished.", score: 0 },
        { text: "I feel I may be punished.", score: 1 },
        { text: "I expect to be punished.", score: 2 },
        { text: "I feel I am being punished.", score: 3 }
      ],
      answer: null,
      index: 6
    },
    {
      question: "How do you feel about yourself?",
      options: [
        { text: "I don't feel disappointed in myself.", score: 0 },
        { text: "I am disappointed in myself.", score: 1 },
        { text: "I am disgusted with myself.", score: 2 },
        { text: "I hate myself.", score: 3 }
      ],
      answer: null,
      index: 7
    },
    {
      question: "How critical are you of yourself?",
      options: [
        { text: "I don't feel I am any worse than anybody else.", score: 0 },
        { text: "I am critical of myself for my weaknesses or mistakes.", score: 1 },
        { text: "I blame myself all the time for my faults.", score: 2 },
        { text: "I blame myself for everything bad that happens.", score: 3 }
      ],
      answer: null,
      index: 8
    },
    {
      question: "Do you have thoughts of harming yourself?",
      options: [
        { text: "I don't have any thoughts of killing myself.", score: 0 },
        { text: "I have thoughts of killing myself, but I would not carry them out.", score: 1 },
        { text: "I would like to kill myself.", score: 2 },
        { text: "I would kill myself if I had the chance.", score: 3 }
      ],
      answer: null,
      index: 9
    },
    {
      question: "Do you cry more than usual?",
      options: [
        { text: "I don't cry any more than usual.", score: 0 },
        { text: "I cry more now than I used to.", score: 1 },
        { text: "I cry all the time now.", score: 2 },
        { text: "I used to be able to cry, but now I can't cry even though I want to.", score: 3 }
      ],
      answer: null,
      index: 10
    },
    {
      question: "Do you often feel irritated or agitated?",
      options: [
        { text: "I am no more irritated by things than I ever was.", score: 0 },
        { text: "I am slightly more irritated now than usual.", score: 1 },
        { text: "I am quite annoyed or irritated a good deal of the time.", score: 2 },
        { text: "I feel irritated all the time.", score: 3 }
      ],
      answer: null,
      index: 11
    },
    {
      question: "Have you lost interest in social interactions?",
      options: [
        { text: "I have not lost interest in other people.", score: 0 },
        { text: "I am less interested in other people than I used to be.", score: 1 },
        { text: "I have lost most of my interest in other people.", score: 2 },
        { text: "I have lost all of my interest in other people.", score: 3 }
      ],
      answer: null,
      index: 12
    },
    {
      question: "Do you find it difficult to make decisions?",
      options: [
        { text: "I make decisions about as well as I ever could.", score: 0 },
        { text: "I put off making decisions more than I used to.", score: 1 },
        { text: "I have greater difficulty in making decisions more than I used to.", score: 2 },
        { text: "I can't make decisions at all anymore.", score: 3 }
      ],
      answer: null,
      index: 13
    },
    {
      question: "How do you feel about your self-worth?",
      options: [
        { text: "I don't feel that I look any worse than I used to.", score: 0 },
        { text: "I am worried that I am looking old or unattractive.", score: 1 },
        { text: "I feel there are permanent changes in my appearance that make me look unattractive.", score: 2 },
        { text: "I believe that I look ugly.", score: 3 }
      ],
      answer: null,
      index: 14
    },
    {
      question: "How much energy do you have for daily tasks?",
      options: [
        { text: "I can work about as well as before.", score: 0 },
        { text: "It takes an extra effort to get started at doing something.", score: 1 },
        { text: "I have to push myself very hard to do anything.", score: 2 },
        { text: "I can't do any work at all.", score: 3 }
      ],
      answer: null,
      index: 15
    },
    {
      question: "Have you noticed any changes in your sleeping pattern?",
      options: [
        { text: "I can sleep as well as usual.", score: 0 },
        { text: "I don't sleep as well as I used to.", score: 1 },
        { text: "I wake up 1-2 hours earlier than usual and find it hard to get back to sleep.", score: 2 },
        { text: "I wake up several hours earlier than I used to and cannot get back to sleep.", score: 3 }
      ],
      answer: null,
      index: 16
    },
    {
      question: "Do you get tired easily?",
      options: [
        { text: "I don't get more tired than usual.", score: 0 },
        { text: "I get tired more easily than I used to.", score: 1 },
        { text: "I get tired from doing almost anything.", score: 2 },
        { text: "I am too tired to do anything.", score: 3 }
      ],
      answer: null,
      index: 17 
    },
    {
      question: "Have you noticed any changes in your appetite?",
      options: [
        { text: "My appetite is no worse than usual.", score: 0 },
        { text: "My appetite is not as good as it used to be.", score: 1 },
        { text: "My appetite is much worse now.", score: 2 },
        { text: "I have no appetite at all anymore.", score: 3 }
      ],
      answer: null,
      index: 18
    },
    {
      question: "Do you have difficulty concentrating?",
      options: [
        { text: "I can concentrate as well as ever.", score: 0 },
        { text: "I can't concentrate as well as usual.", score: 1 },
        { text: "It's hard to keep my mind on anything for very long.", score: 2 },
        { text: "I find I can't concentrate on anything.", score: 3 }
      ],
      answer: null,
      index: 19
    },
    {
      question: "Do you often feel physically unwell or worried about your health?",
      options: [
        { text: "I am no more worried about my health than usual.", score: 0 },
        { text: "I am worried about physical problems like aches, pains, upset stomach, or constipation.", score: 1 },
        { text: "I am very worried about physical problems and it's hard to think of much else.", score: 2 },
        { text: "I am so worried about my physical problems that I cannot think of anything else.", score: 3 }
      ],
      answer: null,
      index: 20
    },
    {
      question: "Have you lost interest in sex?",
      options: [
        { text: "I have not noticed any recent change in my interest in sex.", score: 0 },
        { text: "I am less interested in sex than I used to be.", score: 1 },
        { text: "I have almost no interest in sex.", score: 2 },
        { text: "I have lost interest in sex completely.", score: 3 }
      ],
      answer: null,
      index: 21
    }
  ];

  // State management
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));
  const [answerValues, setAnswerValues] = useState(Array(quizData.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  // Calculate total possible score
  const maxPossibleScore = 63; // 21 questions, max 3 points each

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
    
    if (score <= 10) {
      return {
        title: "Minimal Depression",
        description: "Your responses indicate minimal or no depression. Continue with your current healthy habits.",
        colorClass: styles.excellent
      };
    } else if (score <= 16) {
      return {
        title: "Mild Depression",
        description: "Your responses suggest mild mood disturbance. Consider self-care strategies to maintain your mental wellbeing.",
        colorClass: styles.good
      };
    } else if (score <= 30) {
      return {
        title: "Moderate Depression",
        description: "Your responses indicate moderate depression. Consider speaking with a mental health professional about support options.",
        colorClass: styles.moderate
      };
    } else {
      return {
        title: "Severe Depression",
        description: "Your responses suggest severe depression. We strongly recommend consulting with a healthcare professional as soon as possible.",
        colorClass: styles.needsAttention
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
      if (currentQuestion < quizData.length - 1) {
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
  };

  // Handle email submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would send this data to your server
    setFormSubmitted(true);
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


    // Determine color based on percentage
    const getColorClass = () => {
      const score = calculateScore();
      if (score <= 10) return styles.excellentColor;
      if (score <= 16) return styles.goodColor;
      if (score <= 30) return styles.moderateColor;
      return styles.needsAttentionColor;
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
            className={`${styles.progressCircle} ${getColorClass()} ${animateProgress ? styles.animate : ''}`}
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
          <span className={styles.scoreLabel}>Depression Score</span>
        </div>
      </div>
    );
  });

  return (
    <>
  <div class={styles.assessmentBanner}>
  <div className={[styles.bannerDecoration, styles.decoration1].join(" ")}></div>
  <div className={[styles.bannerDecoration, styles.decoration2].join(" ")}></div>
  
  <div class={styles.bannerContent}>
    <div class={styles.bannerHeader}>
      <h1 class={styles.SelfBannerTitle}>Depression Self Assessment</h1>
      <p class={styles.SelfBannerTitle}>A confidential screening tool to help evaluate your mental wellbeing</p>
    </div>
    
    <div class={styles.bannerInfo}>
      <p class={styles.bannerDisclaimer}>
        This assessment is based on the Beck Depression Inventory (BDI).
        It is not a diagnostic tool, but can help identify symptoms that
        may warrant professional attention.
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
                style={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
              />
            </div>
          </div>
          
          <div className={`${styles.questionContainer} ${transitioning ? styles.fadeOut : styles.fadeIn}`}>
            <h2 className={styles.questionText}>{quizData[currentQuestion].question}</h2>
            
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
              className={currentQuestion === 0 ? `${styles.buttonPrevious} ${styles.disabled}` : styles.buttonPrevious}
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
                // disabled={answers[currentQuestion] === null}
              >
                Skip
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.resultsContainer}>
          <h2 className={styles.resultsTitle}>Assessment Complete</h2>
          <p className={styles.resultsSubtitle}>Thank you for completing this depression screening.</p>
          
          <div className={styles.resultsContent}>
            {/* Left side: Circular progress */}
            <div className={styles.resultsProgress}>
            <CircularProgress percentage={scorePercentage()} />
            </div>
            
            {/* Right side: Score interpretation */}
            <div className={styles.resultsInterpretation}>
              <h3 className={`${styles.interpretationTitle} ${getInterpretation().colorClass}`}>
                {getInterpretation().title}
              </h3>
              <p className={styles.interpretationDescription}>
                {getInterpretation().description}
              </p>
              <div className={styles.scoreDetails}>
                <p>Score: {calculateScore()} out of {maxPossibleScore} points</p>
              </div>
              <div className={styles.disclaimer}>
                <p>This is not a clinical diagnosis. Please consult with a qualified mental health professional for proper evaluation.</p>
              </div>
            </div>
          </div>
          
          {/* Blurred section with email capture form */}
          <div className={styles.detailedResults}>
            
               <div className={styles.thankyouMN}>
              <div className={styles.checkiconMN}>✓</div>
              <h2 className={styles.formtitleMN}>Thank You!</h2>
              <p className="form-subtitle-MN">Your Mental wellness is precious to us.</p>
              <p className="form-subtitle-MN">Your Detailed Report Has Been Successfully Send To Your Provided Mail.</p>

              
              
              
              
              
            </div>
            {/* Overlay form */}
            {!formSubmitted && (
              <div className={styles.formOverlay}>
                <div className={styles.formContainer}>
                  <h3 className={styles.formTitle}>Get Your Full Report</h3>
                  <p className={styles.formSubtitle}>Enter your details to receive a personalized assessment report with detailed insights and recommendations.</p>
                  
                  <form onSubmit={handleSubmit} className={styles.emailForm}>
                    <div className={styles.formField}>
                      <label htmlFor="name" className={styles.formLabel}>Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className={styles.formInput}
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div className={styles.formField}>
                      <label htmlFor="email" className={styles.formLabel}>Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.formInput}
                        placeholder="Your email address"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className={styles.formButton}
                    >
                      Get My Detailed Report
                    </button>
                    
                    <p className={styles.privacyNote}>
                      We respect your privacy and will never share your information with third parties.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
          
          <button
            onClick={resetQuiz}
            className={styles.resetButton}
          >
            Take Assessment Again
          </button>
        </div>
      )}
    </div>

    </>
  );
  
};

export default DepressionTest;