import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuthStore } from "./store/adminAuthStore";

const ProtectedRoute = ({ children }) => {
  const { isAuth, checkAuth } = useAdminAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const isAuthenticated = sessionStorage.getItem("adminToken");
  if (!isAuth && !isAuthenticated) {
    return <Navigate to="/su/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
