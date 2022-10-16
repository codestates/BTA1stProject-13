import React from "react";
import "./App.css";
import { Router } from "react-chrome-extension-router";
import Main from "./component/Main";

const App = () => {
  return (
    <Router>
      <Main />
    </Router>
  );
};

export default App;
