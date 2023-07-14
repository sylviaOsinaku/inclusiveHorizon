import React from "react";
import classes from "./EquityHome.module.css";
import { UserAuth } from "../../auth/AuthContext";
function EquityHome() {
  const { currentUser } = UserAuth();
  return (
    <div className={classes["home-container"]}>
      <h1>
        Welcome back <span>{currentUser.displayName}</span>
      </h1>

      <p>
        🎉 Welcome to a Community of Change-makers: Connect with like-hearted
        individuals and be part of a vibrant community that believes in the
        power of equality. Together, we can shape a brighter future.
      </p>
    </div>
  );
}

export default EquityHome;
