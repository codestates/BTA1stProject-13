import React, { useEffect, useState } from "react";
import { goTo } from "react-chrome-extension-router";
import TextField from "@mui/material/TextField";
import { useInput } from "../hooks/useInput";
import { getPassword, setLogin } from "../utils/storage";
import { Button } from "@mui/material";
import Home from "./Home";

const LoginPage = () => {
  const [login, onChangeLogin] = useInput("");
  const [pwd, setPwd] = useState("");

  const onClickSubmit = () => {
    if (pwd === login) {
      setLogin(true);
      goTo(Home);
    }
  };

  useEffect(() => {
    getPassword().then((res) => {
      setPwd(res);
    });
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", paddingTop: "50px" }}>
        <TextField
          label="비밀번호입력"
          onChange={onChangeLogin}
          id="outlined-required"
          type="password"
          defaultValue=""
          style={{ margin: "10px auto", width: "280px" }}
        />
        <div style={{ paddingTop: "10px" }}>
          <Button variant="contained" onClick={onClickSubmit}>
            확인
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
