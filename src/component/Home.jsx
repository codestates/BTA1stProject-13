import React, { useEffect, useState } from "react";
import { Link } from "react-chrome-extension-router";
import Axios from "axios";
import Button from "@mui/material/Button";
import Layout from "./Layout";
import Transaction from "./Transaction";
import { getPublicKey } from "../utils/storage";

const Home = () => {
  const [balance, setBalance] = useState();
  const [myAddress, setMyAddress] = useState("...");
  const [viewAddress, setViewAddress] = useState("...");
  const [neoAmount, setNeoAmount] = useState(0);
  const [gasAmount, setGasAmount] = useState(0);

  const checkBalance = async () => {
    let result = await Axios.post("http://localhost:50012", {
      jsonrpc: "2.0",
      method: "getnep17balances",
      params: [myAddress],
      id: 1,
    });

    setBalance(result.data.result);
  };

  useEffect(() => {
    getPublicKey().then((res) => {
      setMyAddress(res);
      setViewAddress(res.substr(0, 8));
    });
  }, []);

  useEffect(() => {
    checkBalance();
  }, [myAddress]);

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

  return (
    <>
      <Layout>
        <div style={{ textAlign: "center" }}>
          <div style={{ marginTop: "20px" }}>
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "16px",
                  marginLeft: "20px",
                }}
              >
                Account 1
              </span>
              <span style={{ fontSize: "16px", marginRight: "20px" }}>
                {viewAddress}...
              </span>
            </span>
            <hr style={{ marginTop: "20px", backgroundColor: "#dada" }} />
          </div>
          <div style={{ marginTop: "45px" }}>
            <img width="50px" height="50px" src="neo.png" alt="neo gas" />
            <h2>NEO</h2>
            <h3>{neoAmount && neoAmount} NEO</h3>
            <img
              style={{ marginTop: "20px" }}
              width="50px"
              height="50px"
              src="gas.png"
              alt="neo gas"
            />
            <h2>GAS</h2>
            <h3>{gasAmount && gasAmount} GAS</h3>
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link component={Transaction} style={{ textDecoration: "none" }}>
            <Button variant="contained">전송</Button>
          </Link>
        </div>
      </Layout>
    </>
  );
};

export default Home;
