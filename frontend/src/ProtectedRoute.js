// const ProtectedRoute = ({ user, children }) => {
//   if (!user) {
//     return <Navigate to="/landing" replace />;
//   }

//   return children;
// };

import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuthStore } from "./store/adminAuthStore";

const ProtectedRoute = ({ children }) => {
  const { isAuth, checkAuth } = useAdminAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuth) {
    return <Navigate to="/su/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
