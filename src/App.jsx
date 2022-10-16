import React, { useEffect, useState } from "react";
import "./App.css";
import { Router } from "react-chrome-extension-router";
import Main from "./component/Main";
import { getStoredOptions } from "./utils/storage";
import Home from "./component/Home";
import Transaction from "./component/Transaction";

const App = () => {
  const [bool, setBool] = useState(false);

  useEffect(() => {
    getStoredOptions().then((res) => {
      setBool(!!res);
    });
  }, []);

  return (
    <Router>
      {/* {bool ? (
        <>
          <Home />
        </>
      ) : (
        <>
          <Main />
        </>
      )} */}
      <Transaction />
    </Router>
  );
};

export default App;
