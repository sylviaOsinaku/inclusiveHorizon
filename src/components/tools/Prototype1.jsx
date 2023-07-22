// PledgeItem.js

import React from "react";
import classes from "./Tools.module.css";
import "./prop.css";

const PledgeItem = ({ pledge }) => {
  const impactStatement =
    "My impact statement on promoting social equality is by:";

  const { oath, goals, progress, focusArea } = pledge;
  const progressInPercentage = (progress * 100) / 10;
  console.log(progress);
  return (
    <div className="pledge-item">
      <h3>{oath}</h3>
      <p className={"impact-statement"}>{impactStatement}</p>
      <ol>
        {goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ol>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progress ? progressInPercentage : 20}%` }}
        ></div>
      </div>
      <p>Progress: {progressInPercentage || 50}%</p>
      <span>Focus Area: {focusArea}</span>
    </div>
  );
};

export default PledgeItem;
