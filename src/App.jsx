import React from "react";
import "./App.css";
import { Router } from "react-chrome-extension-router";
import Home from "./component/Home";

const App = () => {
  return (
    <Router>
      <Home />
    </Router>
  );
};

export default App;
