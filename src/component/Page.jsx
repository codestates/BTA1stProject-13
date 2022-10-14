import React from "react";
import { Link } from "react-chrome-extension-router";
import Home from "./Home";

const Page = () => {
  return (
    <>
      <Link component={Home}>홈으로 가기</Link>
      <div>2페이지!</div>
    </>
  );
};

export default Page;
