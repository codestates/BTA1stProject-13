import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import * as Neon from "@cityofzion/neon-js";
import { Link, goTo } from "react-chrome-extension-router";
import { utils } from "ethers";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PasswordPage from "./PasswordPage";
import {
  getPassword,
  setPrivateKey,
  setPublicKey,
  setStoredCheck,
} from "../../utils/storage";
import Home from "../Home";

const CheckMnemonic = () => {
  const [myPassword, setMyPassword] = useState("");
  const [text, setText] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);

  const numArray = [1, 2, 3, 4, 5, 6];

  const createMnemonic = (mnemonicCode, pwd) => {
    let result = "";
    mnemonicCode.map((num) => (result = result.concat(`${num} `)));

    const wallet = utils.HDNode.fromMnemonic(result.trim(), pwd);

    const myPrivateKey = wallet.privateKey.substr(2);
    const myPublicKey = new Neon.wallet.Account(myPrivateKey);

    setPublicKey(myPublicKey.address);
    setPrivateKey(myPrivateKey);

    setStoredCheck(true);
    goTo(Home);
  };

  const onChangeText = (e, num) => {
    let array = text;
    array[num] = e.target.value;
    setText(array);
  };

  const onClickSubmit = () => {
    createMnemonic(text, myPassword);
  };

  useEffect(() => {
    getPassword().then((res) => {
      setMyPassword(res);
    });
  }, []);

  return (
    <>
      <div style={{ paddingTop: "15px" }}>
        <Link component={PasswordPage}>
          <ArrowBackIcon style={{ width: "16px", marginLeft: "30px" }} />
        </Link>
      </div>
      <div style={{ marginTop: "-25px", textAlign: "center" }}>
        <h1>시드 구문 입력</h1>
      </div>
      {numArray.map((num) => (
        <div style={{ paddingTop: "5px", width: "100%", textAlign: "center" }}>
          <TextField
            label={`${num * 2 - 1}.`}
            onChange={(e) => onChangeText(e, num * 2 - 2)}
            id="outlined-required"
            defaultValue=""
            style={{ margin: "7px", width: "140px" }}
          />
          <TextField
            label={`${num * 2}.`}
            onChange={(e) => onChangeText(e, num * 2 - 1)}
            id="outlined-required"
            defaultValue=""
            style={{ margin: "7px", width: "140px" }}
          />
        </div>
      ))}
      <div style={{ paddingTop: "11px", width: "100%", textAlign: "center" }}>
        <Button variant="contained" onClick={onClickSubmit}>
          확인
        </Button>
      </div>
    </>
  );
};

export default CheckMnemonic;
