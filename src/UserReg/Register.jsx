import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { ClipLoader } from "react-spinners";

function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassWord] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    if (!userName.trim()) {
      isValid = false;
      newErrors.name = "Please enter a valid name";
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

  function setDisplayName(user, displayName) {
    user
      .updateProfile({
        displayName: displayName,
      })
      .then(() => {
        // Display name updated successfully
        console.log("Display name set to:", displayName);
      })
      .catch((error) => {
        // Handle any errors that occurred during display name update
        console.error(error);
      });

    console.log("Set name func");
  }

  const createUserHandler = function (email, password) {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        updateProfile(auth.currentUser, {
          displayName: userName,
          photoURL:
            "https://images.unsplash.com/photo-1615986201152-7686a4867f30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        console.log("signin");
        // Proceed to set the display name
        //  setDisplayName(user, userName);
        navigate("/equityHome");
        console.log(user);
        console.log("navigate to user Home");
        // ...

        resetForm();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const resetForm = function () {
    setUserEmail("");
    setUserName("");
    setUserPassWord("");
    setError({});
  };

  const emailInputHandler = (e) => {
    if (error.email) {
      setError((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    setUserEmail(e.target.value);
  };

  const userNameInputHandler = (e) => {
    if (error.name) {
      setError((prevErrors) => ({ ...prevErrors, name: "" }));
    }
    setUserName(e.target.value);
  };

  const userPasswordInputHandler = (e) => {
    if (error.password) {
      setError((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    setUserPassWord(e.target.value);
  };

  const submitFormHandler = function (e) {
    e.preventDefault();
    if (validateForm()) {
      createUserHandler(userEmail, userPassword);
    }
    console.log("Hey");
  };

  const emailClasses = error.email
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];
  const userNameClasses = error.name
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];
  const userPaswordClasses = error.password
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : classes["form-control"];

  return (
    <div className={classes["loginin-container"]}>
      <div className={classes["overlay"]}>
        <div className={classes["login-heading-wrapper"]}>
          <h1>Sign Up to InclusiveHorizon</h1>
          <p>Join the InclusiveHorizon with our friends</p>
        </div>
        <form onSubmit={submitFormHandler} className={classes["form-wrapper"]}>
          <div className={classes["control-group"]}>
            <div className={emailClasses}>
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={emailInputHandler}
                value={userEmail}
              />
              {error.email && (
                <p className={classes["error-text"]}>{error.email}</p>
              )}
            </div>
            <div className={userNameClasses}>
              <label htmlFor="">UserName</label>
              <input
                type="text"
                name="username"
                id="username"
                onChange={userNameInputHandler}
                value={userName}
              />
              {error.name && (
                <p className={classes["error-text"]}> {error.name} </p>
              )}
            </div>
          </div>

          <div className={userPaswordClasses}>
            <label htmlFor="">PassWord</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={userPasswordInputHandler}
              value={userPassword}
            />
            {error.password && (
              <p className={classes["error-text"]}>{error.password}</p>
            )}
          </div>
          <button type="submit" className={classes["sign-btn"]}>
            {isLoading ? <ClipLoader /> : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
