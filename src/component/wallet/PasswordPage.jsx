import React, { useState } from "react";
import { Link, goTo } from "react-chrome-extension-router";
import {
  Button,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useInput } from "../../hooks/useInput";
import Main from "../Main";
import { setPassword } from "../../utils/storage";
import CheckMnemonic from "./CheckMnemonic";

const PasswordPage = () => {
  const [password, onChangePassword] = useInput("");
  const [pwdCheck, onChangePwdCheck] = useInput("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPwdCheck, setShowPwdCheck] = useState(false);
  const [check, setCheck] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPwdCheck = () => {
    setShowPwdCheck(!showPwdCheck);
  };

  const handleMouseDownPwdCheck = (event) => {
    event.preventDefault();
  };

  const onClickSubmit = () => {
    setCheck(false);
    if (!password) {
      setCheck(true);
      return;
    }
    if (password !== pwdCheck) {
      setCheck(true);
      return;
    }

    setPassword().then((res) => {
      if (res) {
        goTo(CheckMnemonic);
      }
    });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "50px" }}>
          <Link component={Main}>
            <ArrowBackIcon style={{ width: "30px" }} />
          </Link>
        </div>
        <div style={{ paddingTop: "28px" }}>
          <h1>비밀번호 생성하기</h1>
          <FormControl
            sx={{ m: 1, width: "35ch", margin: "10px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={onChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          <FormControl
            sx={{ m: 1, width: "35ch", margin: "10px" }}
            variant="outlined"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              비밀번호 확인
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPwdCheck ? "text" : "password"}
              value={pwdCheck}
              onChange={onChangePwdCheck}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPwdCheck}
                    onMouseDown={handleMouseDownPwdCheck}
                    edge="end"
                  >
                    {showPwdCheck ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {check ? (
            <div style={{ padding: "10px 0", color: "red" }}>
              비밀번호가 일치하지 않습니다.
            </div>
          ) : (
            <div style={{ padding: "10px 0", color: "transparent" }}>none</div>
          )}
          <div style={{ paddingTop: "10px" }}>
            <Button variant="contained" onClick={onClickSubmit}>
              확인
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordPage;
