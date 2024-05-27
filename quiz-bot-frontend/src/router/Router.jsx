import React from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Home from "../components/Home";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="home" element={<Home />}></Route>
      </Routes>
    </Router>
  );
};
export default AppRouter;
