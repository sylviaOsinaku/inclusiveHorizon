import React from "react";
import { Navigate } from "react-router-dom";

import { UserAuth } from "../auth/AuthContext";
function ProtectedRoute({ children }) {
  // const navigate = useNavigate();
  const { currentUser } = UserAuth();
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/login" />;
    //  null;
  }

  return children;
}

export default ProtectedRoute;
