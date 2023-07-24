import React, { useState, useEffect, useCallback } from "react";
import classes from "./Tools.module.css";
import ToolHeader from "./ToolHeader";
import { tipsAndFacts } from "../../api/TipsnFactspi";

function Tips() {
  const [currentTip, setCurrentTip] = useState(
    "Embrace Diversity, Embrace Strength: In a world filled with unique individuals, social equality thrives when we appreciate and celebrate our differences. Embrace diversity, as it enriches our communities and empowers us to overcome challenges together."
  );
  const [currentIndex, setCurrentIndex] = useState(-1);

  const updateTipOrFact = useCallback(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();

    // Retrieve last stored day from local storage
    const lastDay = parseInt(localStorage.getItem("lastDay"));

    // If the current day is different from the stored day, show the next tip/fact
    if (!isNaN(lastDay) && lastDay !== currentDay) {
      showNextTipOrFact();
      // Store the current day in local storage
      localStorage.setItem("lastDay", currentDay);
    } else if (isNaN(lastDay)) {
      // If lastDay is not stored yet (first-time visit), set the current day
      localStorage.setItem("lastDay", currentDay);
    }
  }, []);

  useEffect(() => {
    updateTipOrFact();
    // Set interval to update tip/fact every 24 hours
    const intervalId = setInterval(updateTipOrFact, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [updateTipOrFact]);

  const showNextTipOrFact = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % tipsAndFacts.length);
  };

  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentTip(tipsAndFacts[currentIndex]);
    }
  }, [currentIndex]);

  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const userLocale = (navigator && navigator.language) || "en";

  const formatedDate = new Intl.DateTimeFormat(userLocale, options).format(
    date
  );

  return (
    <div className={classes["tool-container"]}>
      <ToolHeader title={"Daily Tips n Facts"} />
      <div className={classes["tips-container"]}>
        <h3>
          Date: <span>{formatedDate} </span>
        </h3>
        <p className={classes["text-intro"]}>
          📆 Daily Equality Tips and Facts: Learn something new every day! Get
          your daily dose of actionable tips and fascinating facts about social
          equality. Stay informed and stay inspired as you navigate the path
          towards a more equitable society.
        </p>
        <div className={classes["tips-wrapper"]}>
          <p className={classes["today-text"]}>Todays Tip </p>
          <div>
            <div id="tipOrFact" className={classes["tipOrFact"]}>
              &quot; {currentTip} &quot;
            </div>

            <button
              onClick={showNextTipOrFact}
              className={classes["make-pledge-btn"]}
            >
              Next Tip/Fact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tips;
