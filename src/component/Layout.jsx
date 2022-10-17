import React, { useEffect, useState } from "react";
import { goTo } from "react-chrome-extension-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { getLogin, setLogin } from "../utils/storage";
import LoginPage from "./LoginPage";

const Layout = ({ children }) => {
  const [anchorEl, setAnchorEl] = useState();
  const [first, setFirst] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickLogout = () => {
    setLogin(true);
    setFirst(true);
  };

  useEffect(() => {
    getLogin().then((res) => {
      if (res) {
        goTo(LoginPage);
      }
    });
  }, [first]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <FormControl sx={{ m: 1, minWidth: 120, marginLeft: "20px" }}>
            <Select
              value={30}
              onChange={() => {}}
              displayEmpty
              sx={{ color: "white" }}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value={10}>메인넷</MenuItem>
              <MenuItem value={20}>테스트넷</MenuItem>
              <MenuItem value={30}>localhost</MenuItem>
            </Select>
          </FormControl>
          <IconButton
            sx={{ marginRight: "20px" }}
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onClickLogout}>로그아웃</MenuItem>
          </Menu>
        </div>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
