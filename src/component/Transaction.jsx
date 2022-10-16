import React, { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import Axios from "axios";
import * as Neon from "@cityofzion/neon-js";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import Home from "./Home";
import Layout from "./Layout";

const tx = (fromAddress, amount) => {
  const url = "http://localhost:50012";
  const privateKey =
    "764421817446787541c2353ed82fea1c2a9856a13c05ebc8ad510634f5827f37";

  const facadePromise = Neon.api.NetworkFacade.fromConfig({
    node: url,
  });

  const intent = {
    from: new Neon.wallet.Account(privateKey),
    to: fromAddress,
    decimalAmt: Number(amount),
    contractHash: Neon.CONST.NATIVE_CONTRACT_HASH.NeoToken, // gas 도 추가
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
};

const Transaction = () => {
  const [balance, setBalance] = useState();
  const [sendAddress, setSendAddress] = useState(
    "NSVYhGZYpyHDuyeHuuzLiNhXbbdS1imdHa"
  );
  const [receiveAddress, setReceiveAddress] = useState("");
  const [sendAmount, setSendAmount] = useState(0);
  const [neoAmount, setNeoAmount] = useState(0);
  const [gasAmount, setGasAmount] = useState(0);
  // NZb2bSV9fxVJWzsMpkHWC7ZTkgeVCRou1g

  const checkBalance = async () => {
    let result = await Axios.post("http://localhost:50012", {
      jsonrpc: "2.0",
      method: "getnep17balances",
      params: ["NSVYhGZYpyHDuyeHuuzLiNhXbbdS1imdHa"],
      id: 1,
    });

    console.log(result.data.result);
    setBalance(result.data.result);
  };

  useEffect(() => {
    checkBalance();
  }, []);

  useEffect(() => {
    if (balance) {
      let array = balance.balance;
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        switch (array[i].symbol) {
          case "NEO":
            setNeoAmount(array[i].amount);
            break;
          case "GAS":
            setGasAmount(array[i].amount);
            break;
          default:
            break;
        }
      }
    }
  }, [balance]);

  const onClickSubmit = () => {
    tx(receiveAddress, sendAmount);
  };

  const onChangeSendAmount = (e) => {
    setSendAmount(e.target.value);
    console.log(e.target.value);
  };

  const onChangeSendAddress = (e) => {
    setReceiveAddress(e.target.value);
    console.log(e.target.value);
  };

  return (
    <>
      <Layout>
        <div style={{ marginTop: "16px" }}>
          <Link component={Home}>
            <ArrowBackIcon style={{ width: "16px" }} />
          </Link>
          <span style={{ fontSize: "16px" }}>보내기</span>
          <hr style={{ marginTop: "17px", backgroundColor: "#dada" }} />
        </div>
        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <TextField
            id="outlined-read-only-input"
            label="보내는 주소"
            defaultValue={sendAddress}
            InputProps={{
              readOnly: true,
            }}
            style={{ margin: "10px auto", width: "280px" }}
          />
          <TextField
            required
            label="받는 주소"
            onChange={onChangeSendAddress}
            id="outlined-required"
            defaultValue=""
            style={{ margin: "10px auto", width: "280px" }}
          />
          <TextField
            id="outlined-number"
            label="NEO 수량"
            type="number"
            onChange={onChangeSendAmount}
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
          <h3>예상 수수료? : {gasAmount && gasAmount} GAS</h3>
          <Button variant="contained" onClick={onClickSubmit}>
            확인
          </Button>
        </div>
      </Layout>
    </>
  );
};

export default Transaction;
