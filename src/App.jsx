import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "react-chrome-extension-router";
import Main from "./component/Main";
import { getStoredCheck } from "./utils/storage";
import Home from "./component/Home";

const App = () => {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    getStoredCheck().then((res) => {
      setBool(!!res);
    });
  }, []);

  return (
    <Router>
      {bool ? (
        <>
          <Home />
        </>
      ) : (
        <>
          <Main />
        </>
      )}
    </Router>
  );
};

export default App;
