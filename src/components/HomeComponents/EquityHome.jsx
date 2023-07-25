import React, { useState } from "react";
import ReactDOM from "react-dom";
import classes from "./EquityHome.module.css";
import { UserAuth } from "../../auth/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Backdrop = (props) => {
  return <div className={classes["overlay-root"]} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes["modal-root"]}>
      <header className={classes.header}>
        <h2>Log Out</h2>
      </header>
      <div className={classes.content}>
        <p>Are you sure you want to log out of the InclusiveHorizon App </p>
      </div>
      <footer className={classes.actions}>
        <button onClick={props.onLogOut}>Okay</button>
        <button onClick={props.onDontLogOut}>Close</button>
      </footer>
    </div>
  );
};
function EquityHome() {
  const navigate = useNavigate();

  const { currentUser } = UserAuth();
  const [showModal, setShowModal] = useState(null);

  const showModalHandler = function () {
    setShowModal(true);
  };
  const removeModalHandler = function () {
    setShowModal(null);
  };

  const logUserOutHandler = function () {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        setShowModal(false);
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };

  const dontLogUserOut = function () {
    setShowModal(false);
  };
  const handleLogout = () => {
    setShowModal(true);
  };

  return (
    <React.Fragment>
      <div className={classes["home-container"]}>
        <div className={classes["home-nav"]}>
          <h1>
            Welcome back <span>{currentUser.displayName}</span>
          </h1>

          <button className={classes["logout-btn"]} onClick={handleLogout}>
            Log Out
          </button>
        </div>

        <p>
          🎉 Welcome to a Community of Change-makers: Connect with like-hearted
          individuals and be part of a vibrant community that believes in the
          power of equality. Together, we can shape a brighter future.
        </p>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <ModalOverlay
            onConfirm={showModalHandler}
            onLogOut={logUserOutHandler}
            onDontLogOut={dontLogUserOut}
          />,
          document.getElementById("modal-root")
        )}
      {showModal &&
        ReactDOM.createPortal(
          <Backdrop onConfirm={removeModalHandler} />,
          document.getElementById("overlay-root")
        )}
    </React.Fragment>
  );
}

export default EquityHome;
