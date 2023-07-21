import React, { useState } from "react";
import classes from "./Tools.module.css";
import SavedPledge from "./SavedPledge";

function PledgeModal({
  onShowPledge,
  pledgeList,
  onShowSavedPledgeHandler,
  showSavedPledge,
  setShowSavedPledge,
}) {
  const showMakePledgeHandler = function () {
    onShowPledge(null);
    setShowSavedPledge(false);
  };
  return (
    <>
      {showSavedPledge ? (
        <SavedPledge
          SavedPledges={pledgeList}
          onMakeNewPledge={showMakePledgeHandler}
        />
      ) : (
        <div className={classes["modal-overlay"]}>
          <div className={classes["modal-content"]}>
            <h2>Thank you for filling the pledge!</h2>
            <div className={classes["button-wrapper"]}>
              <button onClick={onShowSavedPledgeHandler}>
                Check out Pledge
              </button>
              <button className="" onClick={showMakePledgeHandler}>
                Make new pledge
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PledgeModal;
