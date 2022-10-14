import React from "react";
import { Link } from "react-chrome-extension-router";
import Page from "./Page";

const Home = () => {
  console.log("first");

  return (
    <>
      <Link component={Page}>2 페이지로 가기</Link>
      <div>Home</div>
      <div>Home</div>
    </>
  );
};

export default Home;
