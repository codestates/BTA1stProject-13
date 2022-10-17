import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-chrome-extension-router";
import CreatePage from "./wallet/CreatePage";
import PasswordPage from "./wallet/PasswordPage";

const Main = () => {
  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "120px" }}>
        <img width="80px" height="80px" src="neomain.png" alt="neo gas" />
        <h2 style={{ paddingBottom: "20px" }}>NEO 지갑 생성이 처음이신가요?</h2>
        <h4>아니요. 이미 비밀 복구 구문이 있습니다</h4>
        <Link component={PasswordPage} style={{ textDecoration: "none" }}>
          <Button variant="contained">지갑 가져오기</Button>
        </Link>
        <h4>네 처음입니다</h4>
        <Link component={CreatePage} style={{ textDecoration: "none" }}>
          <Button variant="contained">지갑 생성</Button>
        </Link>
      </div>
    </>
  );
};

export default Main;
