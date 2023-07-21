import React, { useState, useEffect } from "react";
import classes from "./Tools.module.css";
import { QuizData } from "../../api/QuizApi";
import ToolHeader from "./ToolHeader";
import EndQuiz from "./EndQuiz";
function Quiz() {
  const [CurrentQuestionIndex, setCurrenQuestionIndex] = useState(0);
  const [SelectedAnswer, setSelectedAnswer] = useState("");
  const [seeExplanation, setSeeExplanation] = useState(null);
  const [score, setScore] = useState(0);
  const [isSubmiited, setIsSubmitted] = useState(false);

  const nextQuestionHandler = function () {
    // Check if the selected answer is correct and update the score
    const currentQuestion = QuizData[CurrentQuestionIndex];
    if (SelectedAnswer === currentQuestion.correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    if (CurrentQuestionIndex < QuizData.length - 1) {
      setCurrenQuestionIndex((prev) => prev + 1);
      setSelectedAnswer("");
      setSeeExplanation(false);
      setIsSubmitted(false);
    }
  };

  const handleSelectedAnswer = function (index) {
    console.log("option button clicked before diable");
    setSelectedAnswer(index);
    setIsSubmitted(true);
    console.log("option button clicked after diable");
  };
  const reStartQuiz = function () {
    setCurrenQuestionIndex(0);
    setIsSubmitted(false);
    setScore(0);
    setSeeExplanation(false);
    setSelectedAnswer("");
  };
  const seeExplanationHandler = function () {
    setSeeExplanation((prevState) => !prevState);
  };

  const currentQuestion = QuizData[CurrentQuestionIndex];

  return (
    <div className="tool-container">
      <ToolHeader title={"Quiz App"} />
      {CurrentQuestionIndex < QuizData.length - 1 ? (
        <div className={classes["question-container"]}>
          <h2>{currentQuestion.question}</h2>
          <div className={classes["options-wrapper"]}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectedAnswer(index)}
                className={
                  isSubmiited
                    ? index === SelectedAnswer
                      ? SelectedAnswer === currentQuestion.correct_answer
                        ? `${classes["make-pledge-btn"]} ${classes["correct-button"]}`
                        : `${classes["make-pledge-btn"]} ${classes["incorrect-button"]}`
                      : `${classes["make-pledge-btn"]} ${classes["disabled-button"]}`
                    : classes["make-pledge-btn"]
                }
                disabled={isSubmiited}
              >
                {" "}
                {option}
              </button>
            ))}
          </div>
          <div className={classes["button-wrapper"]}>
            <button type="submit" onClick={nextQuestionHandler}>
              Nex Question
            </button>
            <button onClick={seeExplanationHandler}>
              {seeExplanation ? "Remove Explanation" : "See Explanation"}
            </button>
          </div>
          {seeExplanation && (
            <p className={classes["explanation-wrapper"]}>
              <small>{currentQuestion.explanation}</small>
            </p>
          )}
        </div>
      ) : (
        <EndQuiz
          onRestartquiz={reStartQuiz}
          score={score}
          totalQuestions={QuizData.length}
        />
      )}
    </div>
  );
}

export default Quiz;
