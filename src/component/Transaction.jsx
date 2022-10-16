import React, { useEffect, useState } from "react";
import { Link, goTo } from "react-chrome-extension-router";
import Axios from "axios";
import * as Neon from "@cityofzion/neon-js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Home from "./Home";
import Layout from "./Layout";
import { getPublicKey } from "../utils/storage";
import { useInput } from "../hooks/useInput";

const tx = (fromAddress, amount, symbol, key) => {
  const url = "http://localhost:50012";
  const privateKey =
    "764421817446787541c2353ed82fea1c2a9856a13c05ebc8ad510634f5827f37";

  const facadePromise = Neon.api.NetworkFacade.fromConfig({
    node: url,
  });

  let tokenHash;
  if (symbol === "NEO") {
    tokenHash = Neon.CONST.NATIVE_CONTRACT_HASH.NeoToken;
  } else if (symbol === "GAS") {
    tokenHash = Neon.CONST.NATIVE_CONTRACT_HASH.GasToken;
  }

  const intent = {
    from: new Neon.wallet.Account(privateKey),
    to: fromAddress,
    decimalAmt: Number(amount),
    contractHash: tokenHash,
  };

  const signingConfig = {
    signingCallback: Neon.api.signWithAccount(
      new Neon.wallet.Account(privateKey)
    ),
  };

  facadePromise
    .then((facade) => facade.transferToken([intent], signingConfig))
    .then((txid) => console.log(txid))
    .catch((err) => console.log(err));

  goTo(Home);
};

const Transaction = () => {
  const [balance, setBalance] = useState();
  const [sendAddress, setSendAddress] = useState("...");
  const [sendNeoAmount, onChangeSendNeoAmount] = useInput("");
  const [sendGasAmount, onChangeSendGasAmount] = useInput("");
  const [receiveAddress, onChangeReceiveAddress] = useInput("");
  const [neoAmount, setNeoAmount] = useState(0);
  const [gasAmount, setGasAmount] = useState(0);
  const [checkAddress, setCheckAddress] = useState(false);
  const [checkAmount, setCheckAmount] = useState(false);

  const checkBalance = async () => {
    let result = await Axios.post("http://localhost:50012", {
      jsonrpc: "2.0",
      method: "getnep17balances",
      params: [sendAddress],
      id: 1,
    });

    setBalance(result.data.result);
  };

  useEffect(() => {
    getPublicKey().then((res) => {
      setSendAddress(res);
    });
  }, []);

  useEffect(() => {
    console.log(sendAddress);
    checkBalance();
  }, [sendAddress]);

  useEffect(() => {
    if (balance) {
      let array = balance.balance;
      for (let i = 0; i < array.length; i++) {
        switch (array[i].symbol) {
          case "NEO":
            setNeoAmount(array[i].amount);
            break;
          case "GAS":
            setGasAmount(array[i].amount / 100000000);
            break;
          default:
            break;
        }
      }
    }
  }, [balance]);

  const onClickSubmit = () => {
    setCheckAddress(false);
    setCheckAmount(false);
    if (
      !receiveAddress ||
      receiveAddress.substr(0, 1) !== "N" ||
      receiveAddress.length === "34"
    ) {
      setCheckAddress(true);
      return;
    }

    if (
      (!sendNeoAmount && !sendGasAmount) ||
      (sendNeoAmount === "0" && sendGasAmount === "0") ||
      sendNeoAmount < 0 ||
      sendGasAmount < 0
    ) {
      setCheckAmount(true);
      return;
    }

    if (!!sendNeoAmount) {
      tx(receiveAddress, sendNeoAmount, "NEO");
    }

    if (!!sendGasAmount) {
      tx(receiveAddress, sendGasAmount, "GAS");
    }
  };

  return (
    <>
      <Layout>
        <div style={{ marginTop: "16px", position: "relative" }}>
          <Link component={Home}>
            <ArrowBackIcon style={{ width: "16px", marginLeft: "30px" }} />
          </Link>
          <span
            style={{
              fontSize: "20px",
              position: "absolute",
              left: "150px",
              fontWeight: "bolder",
            }}
          >
            보내기
          </span>
          <hr style={{ marginTop: "17px", backgroundColor: "#dada" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <TextField
            required
            label="받는 주소"
            onChange={onChangeReceiveAddress}
            id="outlined-required"
            defaultValue=""
            style={{ margin: "10px auto", width: "280px" }}
          />
          <TextField
            id="outlined-number"
            label="NEO 수량"
            type="number"
            onChange={onChangeSendNeoAmount}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ margin: "10px auto", width: "280px" }}
            helperText={
              <h5 style={{ margin: 0 }}>
                나의 잔액 : {neoAmount && neoAmount} NEO
              </h5>
            }
          />
          <TextField
            id="outlined-number"
            label="GAS 수량"
            type="number"
            onChange={onChangeSendGasAmount}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ margin: "10px auto", width: "280px" }}
            helperText={
              <h5 style={{ margin: 0 }}>
                나의 잔액 : {gasAmount && gasAmount} GAS
              </h5>
            }
          />
          <div>
            {checkAddress ? (
              <div style={{ padding: "10px 0", color: "red" }}>
                올바른 주소를 입력해주세요.
              </div>
            ) : checkAmount ? (
              <div style={{ padding: "10px 0", color: "red" }}>
                NEO 또는 GAS 수량을 입력해주세요.
              </div>
            ) : (
              <div style={{ padding: "10px 0", color: "transparent" }}>
                none
              </div>
            )}
          </div>
          <div style={{ paddingTop: "10px" }}>
            <Button variant="contained" onClick={onClickSubmit}>
              확인
            </Button>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Transaction;
