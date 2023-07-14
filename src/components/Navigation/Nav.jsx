import React from "react";
import classes from "./Nav.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import IconHome from "../../Ui/Home";
import IconClipboardHeartFill from "../../Ui/Board";
import IconBxsCategory from "../../Ui/Category";
import IconUser from "../../Ui/UserProfile";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import IconLogout from "../../Ui/LogOutIcon";

function Nav() {
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <nav>
      <nav className={classes["nav-container"]}>
        <div className={classes["nav-wrapper"]}>
          <NavLink>
            <IconHome />
          </NavLink>
          {/* <NavLink>
            <IconBxsCategory />
          </NavLink> */}
          <NavLink>
            <IconClipboardHeartFill />
          </NavLink>
          <NavLink>
            <IconUser />
          </NavLink>

          <IconLogout signoutfunc={handleLogout} />
        </div>
      </nav>
    </nav>
  );
}

export default Nav;
