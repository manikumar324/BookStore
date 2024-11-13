import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookie from "js-cookie"

const ProtectedRoute = ({ children }) => {
  const user = Cookie.get("userToken")

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;