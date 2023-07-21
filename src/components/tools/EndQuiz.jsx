import React from "react";
import classes from "./Tools.module.css";
function EndQuiz({ onRestartquiz, score, totalQuestions }) {
  const percentageScore = (score / totalQuestions) * 100;

  return (
    <>
      <div className={classes["end-quiz-container"]}>
        <div className={classes["end-quiz-header"]}>
          <h2>Quiz Completed!</h2>
        </div>
        <div className={classes["end-quiz-score"]}>
          <p>
            Your Score:{" "}
            <span className={classes["score-text"]}>
              {score} / {totalQuestions}
            </span>
          </p>
          <div className={classes["progress-bar"]}>
            <div
              className={classes["progress"]}
              style={{ width: `${percentageScore}%` }}
            ></div>
          </div>
        </div>
        <div className={classes["end-quiz-message"]}>
          {score === totalQuestions
            ? "Congratulations! You aced the quiz! 🎉"
            : score >= totalQuestions / 2
            ? "Well done! You did a great job!"
            : "Keep practicing. You can do better next time."}
        </div>
        <button className={classes["restart-button"]} onClick={onRestartquiz}>
          Restart Quiz
        </button>
      </div>
    </>
  );
}

export default EndQuiz;
