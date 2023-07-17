import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InclusiveWordsArr } from "../../api/InclusiveApi";
import IconChevronBackCircleOutline from "../../Ui/PrevIcon";
import classes from "./Tools.module.css";
function InclusiveChecker() {
  const [inclusiveWord, setInclusiveWord] = useState("");
  const [definedWord, setDefinedWord] = useState("");
  const [error, setError] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [filteredWords, setFilteredWords] = useState([]);
  const navigate = useNavigate();

  const wordHandler = (e) => {
    setInclusiveWord(e.target.value);
    setError(false);
  };
  const getWord = function (word) {
    const checkWord = word?.trim().toLowerCase();
    if (!checkWord) {
      setError(true);
      setShowResult(false);
      return;
    }
    setShowResult(true);
    setDefinedWord(checkWord);
    console.log(InclusiveWordsArr);
    const wordResult = InclusiveWordsArr.filter(
      (words) => words.word === checkWord
    );

    console.log(wordResult);
    console.log(wordResult.map((wo) => wo.suggestions));
    setFilteredWords(wordResult);
    setError(false);
  };

  const resetWord = function () {
    setInclusiveWord("");
    setFilteredWords([]);
    setShowResult(false);
    setDefinedWord("");
  };
  const prevPage = function () {
    navigate(-1);
  };

  return (
    <div className={classes["tool-container"]}>
      <div className={classes["tool-header"]}>
        <span onClick={prevPage} className={classes["prevPage"]}>
          <IconChevronBackCircleOutline />
        </span>

        <p className={classes["logo"]}>InclusiveChecker</p>
      </div>
      <p className={classes["text-intro"]}>
        🔎 Inclusive Language Checker: Language plays a powerful role in shaping
        perceptions. Our innovative checker will ensure that your words reflect
        inclusivity and respect for all, helping you cultivate an environment of
        equality in your conversations.
      </p>

      <div
        className={`${classes["checker-container"]} ${classes["form-control"]}`}
      >
        <label htmlFor="inclusiveword">Word</label>
        <input
          type="text"
          name="word"
          id="word"
          onChange={wordHandler}
          value={inclusiveWord}
        />
        {error && (
          <p className={classes["error-text"]}>Please input a values</p>
        )}
        <div className={classes["button-wrapper"]}>
          <button onClick={() => getWord(inclusiveWord)}>Check It</button>
          <button onClick={resetWord}>Reset</button>
        </div>
      </div>

      <div className={classes["results-container"]}>
        {showResult && filteredWords.length > 0 ? (
          <div>
            <span className={classes["word"]}>{definedWord}</span> may be
            insensitive use{" "}
            <div className={classes["results-wrapper"]}>
              {filteredWords.map((word) =>
                word.suggestions.map((sugg) => (
                  <span className={classes["checker-word"]} key={sugg}>
                    {sugg}
                  </span>
                ))
              )}
              <span>Instead</span>
            </div>{" "}
          </div>
        ) : showResult && filteredWords.length <= 0 ? (
          "No problems found..."
        ) : (
          "Results would appear here..."
        )}
      </div>
    </div>
  );
}

export default InclusiveChecker;
