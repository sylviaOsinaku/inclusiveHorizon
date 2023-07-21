// SavedPledges.js
import "./prop.css";
import React from "react";
import PledgeItem from "./Prototype1";

const SavedPledges = () => {
  // Sample data for demonstration
  const pledges = [
    {
      id: 1,
      title: "Support Education for All",
      impactStatement:
        "Providing access to education for underprivileged children.",
      goals: ["Raise $5000", "Establish 3 new schools"],
      progress: 40, // 40% progress
      focusArea: "Social Equality",
    },
    {
      id: 2,
      title: "Support Education for All",
      impactStatement:
        "Providing access to education for underprivileged children.",
      goals: ["Raise $5000", "Establish 3 new schools"],
      progress: 20, // 40% progress
      focusArea: "Social Equality",
    },
    {
      id: 3,
      title: "Support Education for All",
      impactStatement:
        "Providing access to education for underprivileged children.",
      goals: ["Raise $5000", "Establish 3 new schools"],
      progress: 70, // 40% progress
      focusArea: "Social Equality",
    },
    // Add more pledge objects here
  ];

  return (
    <div className="saved-pledges">
      <h2>Saved Pledges</h2>
      <div className="pledges-list">
        {pledges.map((pledge) => (
          <PledgeItem key={pledge.id} pledge={pledge} />
        ))}
      </div>
    </div>
  );
};

export default SavedPledges;
