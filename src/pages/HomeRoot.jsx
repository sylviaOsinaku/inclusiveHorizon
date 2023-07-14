import React from "react";
import { auth } from "../firebase";

import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../components/Navigation/Nav";

function HomeRoot() {
  return (
    <React.Fragment>
      <main className={""} style={{ padding: "1em" }}>
        <Outlet />
      </main>

      {/* <MainNavigation /> */}
      <Nav />
    </React.Fragment>
  );
}

export default HomeRoot;
