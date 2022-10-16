import React, { useState } from "react";
import { Link, goTo } from "react-chrome-extension-router";
import { utils } from "ethers";
import * as Neon from "@cityofzion/neon-js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LockIcon from "@mui/icons-material/Lock";
import { Button } from "@mui/material";
import CreatePage from "./CreatePage";
import Home from "../Home";
import { setStoredCheck, setStoredOptions } from "../../utils/storage";

const Mnemonic = () => {
  const [showMnemonic, setShowMnemonic] = useState(false);
  const [showSummitBtn, setShowSummitBtn] = useState(true);
  const [mnemonic, setMnemonic] = useState("");

  const createMnemonic = () => {
    let mnemonicCode = utils.entropyToMnemonic(utils.randomBytes(16));
    const wallet = utils.HDNode.fromMnemonic(mnemonicCode, "1234");

    // 시간 남으면
    // const array = mnemonicCode.split(" ");
    // console.log(array);

    setMnemonic(mnemonicCode);
    const myPrivateKey = wallet.privateKey.substr(2);
    const myPublicKey = new Neon.wallet.Account(myPrivateKey);
    console.log(myPublicKey.address);

    setStoredOptions(myPublicKey.address);
  };

  const handleClickShowMnemonic = () => {
    if (mnemonic === "") {
      createMnemonic();
    }
    setShowSummitBtn(false);
    setShowMnemonic(!showMnemonic);
  };

  const onClickSubmit = () => {
    setStoredCheck(true);
    goTo(Home);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ paddingTop: "50px" }}>
          <Link component={CreatePage}>
            <ArrowBackIcon style={{ width: "30px" }} />
          </Link>
        </div>
        <div style={{ paddingTop: "28px" }}>
          <h1>니모닉 구문 확인</h1>
          <div style={{ fontSize: "14px" }}>
            비밀 백업 구문을 이용하여 <br />
            계정을 쉽게 백업하고 복구 할 수 있습니다.
          </div>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                display: "table",
                width: "90%",
                cursor: "pointer",
                margin: "20px auto",
                height: "200px",
                backgroundColor: "#EEEEEE",
                alignItems: "center",
              }}
            >
              <div
                onClick={handleClickShowMnemonic}
                style={{ display: "table-cell", verticalAlign: "middle" }}
              >
                {showMnemonic ? (
                  <>{mnemonic}</>
                ) : (
                  <>
                    <LockIcon />
                    <div style={{ padding: "2px" }}>
                      비밀 단어를 표시하려면 <br />
                      여기를 클릭하세요.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div
            style={{
              color: "red",
              paddingBottom: "5px",
              fontSize: "16x",
              fontWeight: "bold",
            }}
          >
            경고! 백업 구문은 절대로 공개하지 마세요.
          </div>
          <div style={{ fontSize: "12px" }}>
            이 구문이 있는 사람은 <br />
            귀하의 소중한 재산을 소유할 수 있습니다.
          </div>
          <div style={{ paddingTop: "20px" }}>
            <Button
              disabled={showSummitBtn}
              variant="contained"
              onClick={onClickSubmit}
            >
              시작하기
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mnemonic;
