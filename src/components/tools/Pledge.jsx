import React, { useState, useEffect } from "react";
import ToolHeader from "./ToolHeader";
import classes from "./Tools.module.css";
import PledgeModal from "./PledgeModal";
import { v4 as uuidv4 } from "uuid";
// import uuid from "uuidv4";
// const unique_id = uuid();
//   const small_id = unique_id.slice(0,8)

function Pledge() {
  const [pledgeLists, setPledgeLists] = useState(() => {
    const savedPledged = localStorage.getItem("pledgedLists");
    if (savedPledged) {
      return JSON.parse(savedPledged);
    } else {
      return [];
    }
  });
  const [pledge, setPledge] = useState("");
  const [goal, setGoal] = useState("");
  const [myGoals, setMyGoals] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSavedPledge, setShowSavedPledge] = useState(false);
  const [myProgress, setMyProgress] = useState(0);

  const showSavedPledgeHandler = function () {
    setShowSavedPledge(true);
    setIsSubmitted(true);
  };

  useEffect(() => {
    localStorage.setItem("pledgedLists", JSON.stringify(pledgeLists));
  }, [pledgeLists]);

  const pledgeHandler = function (e) {
    if (errors.pledge) {
      setErrors((prevErrors) => ({ ...prevErrors, pledge: "" }));
    }
    setPledge(e.target.value);
  };

  const goalHandler = function (e) {
    if (errors.goal) {
      setErrors((prevErrors) => ({ ...prevErrors, goal: "" }));
    }
    setGoal(e.target.value);
  };

  const addGoalHandler = function (newgoal) {
    if (!newgoal) return;

    setGoal("");
    setMyGoals((prevGoals) => [...prevGoals, newgoal]);
    console.log(myGoals);
  };

  const addProgressHandler = (e) => {
    setMyProgress(e.target.value);
  };

  const validateForm = function () {
    console.log("validate from func");
    let isValid = true;
    const newErrors = {};
    if (!pledge.trim()) {
      newErrors.pledge = "Pledge is Required!";
      isValid = false;
    }
    if (myGoals.length <= 0) {
      isValid = false;
      newErrors.goal = "Enter at least one goal to achieve";
    }
    if (myProgress < 0) {
      isValid = false;
      newErrors.progress = "Progress must be greater than 0";
    }

    setErrors(newErrors);
    return isValid;
  };

  const ResetForm = function () {
    setPledge("");
    setGoal("");
    setMyGoals([]);
    setMyProgress(0);
  };

  const submitPledgeHandler = function (e) {
    e.preventDefault();
    if (validateForm()) {
      console.log("submit button");
      const myPledge = {
        oath: pledge,
        goals: myGoals,
        focusArea: "Social Equality",
        id: uuidv4().slice(0, 8),
        progress: myProgress,
      };

      setPledgeLists((prevPledge) => [...prevPledge, myPledge]);

      console.log(myPledge);

      ResetForm();
      setIsSubmitted(true);
      return;
    }

    console.log("form not submitted");
  };

  return (
    <React.Fragment>
      {isSubmitted ? (
        <PledgeModal
          showpledge={isSubmitted}
          onShowPledge={setIsSubmitted}
          pledgeList={pledgeLists}
          setShowSavedPledge={setShowSavedPledge}
          showSavedPledge={showSavedPledge}
          onShowSavedPledgeHandler={showSavedPledgeHandler}
        />
      ) : (
        <div className={classes["tool-container"]}>
          <ToolHeader title={"Personal Pledge"} />
          <p className={classes["text-intro"]}>
            📝 Personal Pledge for Progress: Take the first step towards
            personal growth and transformation. Craft your own quality pledge,
            set goals, and make a real impact on the world around you.
          </p>

          <div className={classes["form-actions"]}>
            <div className={classes["form-control"]}>
              <label htmlFor="">Craft your pledge for social equality:</label>

              <textarea
                name="pledge"
                id="pledge"
                rows="3"
                onChange={pledgeHandler}
                value={pledge}
                placeholder="What are some areas in your life that require personal growth?"
              ></textarea>
              {errors.pledge && (
                <p className={classes["error-text"]}>{errors.pledge}</p>
              )}
            </div>

            <div className={`${classes["form-control"]}  `}>
              <label htmlFor="">Set your goals for promoting equality:</label>
              <div className={classes["goal-form-wrapper"]}>
                <input
                  type="text"
                  name="goal"
                  placeholder="Promote gender-inclusive education"
                  id="goal"
                  onChange={goalHandler}
                  value={goal}
                />
                <button type="button" onClick={() => addGoalHandler(goal)}>
                  Add Goal
                </button>
              </div>

              {errors.goal && (
                <p className={classes["error-text"]}>{errors.goal}</p>
              )}
            </div>

            <div className={`${classes["form-control"]}  `}>
              <label htmlFor="">Set your goals for promoting equality:</label>
              <div className={classes["goal-form-wrapper"]}>
                <input
                  type="number"
                  name="progress"
                  placeholder="Add progress from 1-10"
                  id="progress"
                  onChange={addProgressHandler}
                  value={myProgress}
                />
                {errors.progress && (
                  <p className={classes["error-text"]}>{errors.progress}</p>
                )}
              </div>

              {errors.goal && (
                <p className={classes["error-text"]}>{errors.goal}</p>
              )}
            </div>
            <div className={classes["button-wrapper"]}>
              <button onClick={submitPledgeHandler}>Make Pledge</button>
              <button onClick={showSavedPledgeHandler}>Show Pledges</button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default Pledge;
