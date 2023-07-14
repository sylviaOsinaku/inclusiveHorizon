import { useState, createContext, useEffect, useContext } from "react";

import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
const UserAuthContext = createContext();

export const UserAuthContextProvider = function ({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const isUserLoggedInFunc = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user);
        setCurrentUser(user);
        console.log("signed user in sing uuseEffect");
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user Signed Ouut");
        // navigate("/login");
      }
    });

    return () => {
      isUserLoggedInFunc();
    };
  }, []);

  return (
    <UserAuthContext.Provider value={{ currentUser }}>
      {children}
    </UserAuthContext.Provider>
  );
};

export const UserAuth = function () {
  return useContext(UserAuthContext);
};
