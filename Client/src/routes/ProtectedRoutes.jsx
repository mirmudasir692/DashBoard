import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import Spinner from "../globals/spinner";
import { useAuthStatusQuery } from "../features/authApiSlice";

function ProtectedRoute({ element, isProtected = true }) {
  const { data, isLoading, isError } = useAuthStatusQuery();

  const isAuthenticated = isError ? false : data?.isAuthenticated;

  // Saving user data to Redux
  if (isLoading) return <Spinner size="large" bg="light" fullScreen={true} />;
  console.log("isAuthenticated", isAuthenticated);
  console.log("isProtected", isProtected);
  console.log("isLoading", isLoading);

  if (isProtected && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Wait for user data to be saved to Redux if authenticated and profile data exists
  if (isLoading) {
    return <Spinner size="large" bg="light" fullScreen={true} />;
  }

  return element;
}

export default ProtectedRoute;
