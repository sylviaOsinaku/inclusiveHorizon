import React from "react";
import { auth } from "../firebase";

import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Navigation/Nav";

function HomeRoot() {
  return (
    <React.Fragment>
      <Nav />
      <main className={""}>
        <Outlet />
      </main>

      {/* <MainNavigation /> */}
    </React.Fragment>
  );
}

export default HomeRoot;
