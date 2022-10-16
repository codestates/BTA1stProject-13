import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Layout = ({ children }) => {
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
            onClick={() => {}}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </div>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
