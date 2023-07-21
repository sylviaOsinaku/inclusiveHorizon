import React from "react";
import classes from "./EquityHome.module.css";
import { UserAuth } from "../../auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";
function EquityHome() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  const { currentUser } = UserAuth();
  return (
    <div className={classes["home-container"]}>
      <div className={classes["home-nav"]}>
        <h1>
          Welcome back <span>{currentUser.displayName}</span>
        </h1>

        <button className={classes["logout-btn"]}>Log Out</button>
      </div>

      <p>
        🎉 Welcome to a Community of Change-makers: Connect with like-hearted
        individuals and be part of a vibrant community that believes in the
        power of equality. Together, we can shape a brighter future.
      </p>
    </div>
  );
}

export default EquityHome;
