import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { ClipLoader } from "react-spinners";

function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});

  const emailInputHandler = (e) => {
    if (error.email) {
      setError((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    setUserEmail(e.target.value);
  };

  const passwordInputHandler = (e) => {
    if (error.password) {
      setError((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    setUserPassword(e.target.value);
  };

  const validateForm = function () {
    console.log("validate from func");
    let isValid = true;
    const newErrors = {};
    if (!userEmail.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userEmail)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!userPassword.trim()) {
      isValid = false;
      newErrors.password = "please enter a password";
    } else if (userPassword.length < 6) {
      isValid = false;
      newErrors.password = "password should contain at least 6 characters";
    }

    setError(newErrors);
    return isValid;
  };

  const resetForm = function () {
    setUserEmail("");
    setUserPassword("");
    setError({});
  };

  const handleSignIn = function (email, password) {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);
        // Signed in
        const user = userCredential.user;
        navigate("/equityHome");
        console.log("loginUser", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        console.log(errorCode);
      });
  };

  const handleFormSubmit = function (e) {
    e.preventDefault();
    if (validateForm()) {
      handleSignIn(userEmail, userPassword);
      resetForm();
    }
  };
  const emailClasses = error.email
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];
  const userPaswordClasses = error.password
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  return (
    <div className={classes["loginin-container"]}>
      <div className={classes["overlay"]}>
        <div className={classes["login-heading-wrapper"]}>
          <h1>Sign in to InclusiveHorizon</h1>
          <p>
            Dont have an account <Link to="/signup">Register</Link>
          </p>
        </div>

        <form onSubmit={handleFormSubmit} className={classes["form-wrapper"]}>
          <div className={emailClasses}>
            <label htmlFor="">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={emailInputHandler}
            />
            {error.email && (
              <p className={classes["error-text"]}>{error.email}</p>
            )}
          </div>

          <div className={userPaswordClasses}>
            <label htmlFor="">PassWord</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={passwordInputHandler}
            />
            {error.password && (
              <p className={classes["error-text"]}>{error.password}</p>
            )}
          </div>

          <button type="submit" className={classes["sign-btn"]}>
            {isLoading ? <ClipLoader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
