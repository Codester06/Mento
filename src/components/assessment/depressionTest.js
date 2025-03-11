import React, { useState, useEffect } from "react";
import styles from "./depressionTest.module.css";


const DepressionTest = () => {

   

  const [showQues, setShowQues] = useState(true);
    const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [gaugeValue, setGaugeValue] = useState(0);
  const [resultText, setResultText] = useState("");
 
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});

  useEffect(() => {
    const mockQuestions = [
      {
        id: 1,
        text: "How often have you felt down, depressed, or hopeless?",
        options: [
          { value: 0, text: "Not at all" },
          { value: 1, text: "Several days" },
          { value: 2, text: "More than half the days" },
          { value: 3, text: "Nearly every day" },
        ],
      },
      {
        id: 2,
        text: "How often have you had little interest or pleasure in doing things?",
        options: [
          { value: 0, text: "Not at all" },
          { value: 1, text: "Several days" },
          { value: 2, text: "More than half the days" },
          { value: 3, text: "Nearly every day" },
        ],
      },
      {
        id: 3,
        text: "How often have you felt down, depressed, or hopeless?",
        options: [
          { value: 0, text: "Not at all" },
          { value: 1, text: "Several days" },
          { value: 2, text: "More than half the days" },
          { value: 3, text: "Nearly every day" },
        ],
      },
      {
        id: 4,
        text: "How often have you felt down, depressed, or hopeless?",
        options: [
          { value: 0, text: "Not at all" },
          { value: 1, text: "Several days" },
          { value: 2, text: "More than half the days" },
          { value: 3, text: "Nearly every day" },
        ],
      },
      {
        id: 6,
        text: "How often have you felt down, depressed, or hopeless?",
        options: [
          { value: 0, text: "Not at all" },
          { value: 1, text: "Several days" },
          { value: 2, text: "More than half the days" },
          { value: 3, text: "Nearly every day" },
        ],
      },
      {
        id: 5,
        text: "How often have you felt down, depressed, or hopeless?",
        options: [
          { value: 0, text: "Not at all" },
          { value: 1, text: "Several days" },
          { value: 2, text: "More than half the days" },
          { value: 3, text: "Nearly every day" },
        ],
      },
    ];

    setQuestions(mockQuestions);

   
    const initialAnswers = {};
    mockQuestions.forEach((q) => {
      initialAnswers[q.id] = null;
    });
    setUserAnswers(initialAnswers);
  }, []);

  const handleAnswerSelect = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
      
    })
);
nextQuestion();
  };

  const totalPages = questions.length;
  const pageNumbersContainer = document.getElementById("pageNumbers");
   

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
     ShowResult();
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(userAnswers).forEach((value) => {
      if (value !== null) {
        score += value;
      }
    });
    return score;
  };

    const ShowResult = () => {
    setShowResult(true);
    setShowQues(false);
    const score = calculateScore();
    const maxPossibleScore = questions.length * 3; 

    const percentageScore = (score / maxPossibleScore) * 100;

    setGaugeValue(percentageScore);

    if (percentageScore <= 20) {
      setResultText("You are doing great! Keep it up! 😊");
    } else if (percentageScore <= 40) {
      setResultText(
        "You may be experiencing some stress. Consider relaxing activities! 🌿"
      );
    } else if (percentageScore <= 60) {
      setResultText(
        "You might need some self-care. Talking to someone can help! ❤️"
      );
    } else {
      setResultText(
        "It may help to seek support from a professional. You are not alone! 💙"
      );
     
    }

    
  };






  const redirectToHelp = () => {
    // Redirect to help resources
    alert("This would redirect to professional help resources");
  };

return (
        <>
        
        
     

    <div className={styles.app}>
    {showResult && (
          <div className={styles.gaugeResult}>
            <h3>Your Mental Wellness Score</h3>
            <div className={styles.gauge}>
              <div className={styles.gaugeBackground}></div>
              <div className={styles.gaugeCenter}></div>
              <div
                className={styles.gaugeNeedle}
                style={{
                  transform: `rotate(${(gaugeValue / 100) * 180 - 90}deg)`,
                }}
              ></div>
              <div className={styles.gaugeValue}>{Math.round(gaugeValue)}%</div>
            </div>

            <div className={styles.resultText}>{resultText}</div>
            (
              <button className={styles.helpBtn} onClick={redirectToHelp}>
                Wanna seek professional help? Click here
              </button>
            )
          </div>
        )
    }
       {showQues && (
          
            questions.length > 0 && (
              <div className={styles.questionSlide}>
                <div className={styles.questions}>

                <p>{questions[currentQuestion].text}</p>
                </div>
                <div className={styles.options}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <label key={index}>
                     <button  className={styles.optionLabel} onClick={() => handleAnswerSelect(questions[currentQuestion].id, option.value)}>
                         {option.text}
                        </button>
                    </label>
                  ))}
                </div>
              </div>
            )
          )}
            <nav className={styles.pagination}>
              <ul className={styles.paginationList}>
                <li>
                  <button
                    onClick={prevQuestion}
                    className={currentQuestion === 0 ? styles.hidden : ""}
                  >
                    ‹ Prev
                  </button>
                </li>
                <li id="pageNumbers" className={styles.pageNumbers}>
                  {Array.from({ length: questions.length }, (_, i) => (
                    <span
                      key={i}
                      className={i === currentQuestion ? styles.activePage : ""}
                      onClick={() => setCurrentQuestion(i)}
                    >
                      {i + 1}
                    </span>
                  ))}
                </li>
                <li>
                  <button onClick={nextQuestion}>
                    {currentQuestion === questions.length - 1
                      ? "Finish"
                      : "Next ›"}
                  </button>
                </li>
              </ul>
            </nav>
          
)

        {showResult && (
          <div className={styles.scoreRange}>
            <h3>Score Interpretation</h3>
            <p>
              <strong>0-20:</strong> You are doing great! Keep it up! 😊
            </p>
            <p>
              <strong>21-40:</strong> You may be experiencing some stress.
              Consider relaxing activities! 🌿
            </p>
            <p>
              <strong>41-60:</strong> You might need some self-care. Talking to
              someone can help! ❤️
            </p>
            <p>
              <strong>61+:</strong> It may help to seek support from a
              professional. You are not alone! 💙
            </p>
          </div>
        )}

        
      
    </div>
    </>
  );
};

export default DepressionTest;
