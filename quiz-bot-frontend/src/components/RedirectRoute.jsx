import React from "react";
import { Navigate, Route } from "react-router-dom";

const RedirectRoute = ({ component: Component }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user.role === "admin") {
    return <Component />;
  } else {
    return <Navigate to="/home" replace/>;
  }
};

export default RedirectRoute;
