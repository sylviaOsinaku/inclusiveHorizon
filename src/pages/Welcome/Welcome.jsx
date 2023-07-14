import React from "react";
import Typewriter from "../../components/WelcomeComponents/TypeWriter";
import classes from "./Welcome.module.css";
import { Link } from "react-router-dom";
function Welcome() {
  const typeWritingEqualityTexts = [
    " 🎉 Welcome to a Community of Change-makers",
    "🌟 Embrace Diversity, Ignite Change",
    "🤝 Unite for Equality",
    "🔔 Empowering Quotes at Your Fingertips",
    " 🎨Inclusive Language Made Easy",
    "📆 Daily Tips for a Fairer World",
    "📝 Personal Pledge for Progress",
    "🧠 Expand Your Knowledge: Engage in our captivating",
  ];
  return (
    <div className={classes["welcome-container"]}>
      <div className={classes["overlay"]}>
        <h1 className={classes[""]}>Welome to InclusiveHorizon App</h1>
        <p className={classes["intro-text"]}>
          Your in-one toolbox app designed to promote social equality and create
          a more inclusive world.{" "}
        </p>
        <Typewriter texts={typeWritingEqualityTexts} />
        <div className={classes["cta-wrapper"]}>
          <Link className={classes["cta-button"]} to="/login">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
