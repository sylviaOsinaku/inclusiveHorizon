import React from "react";
import ToolHeader from "./ToolHeader";
import PledgeItem from "./Prototype1";
import classes from "./Tools.module.css";
function SavedPledge({ SavedPledges, onMakeNewPledge }) {
  return (
    <div>
      <ToolHeader title={"Saved Pledges"} />

      <div className={classes["pledges-list"]}>
        {SavedPledges.map((pledge) => (
          <PledgeItem key={pledge.id} pledge={pledge} />
        ))}
      </div>
      <button onClick={onMakeNewPledge} className={classes["make-pledge-btn"]}>
        Make new Pledge
      </button>
    </div>
  );
}

export default SavedPledge;
