import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header as AppBar } from "./appbar";
import SideBar from "./sidebar";
import { useNavigate, useLocation } from 'react-router-dom';
import "./style.css";

function index() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogin } = useSelector(state => state.user);

  useEffect(() => {
    if (user == null && !isLogin) {
      navigate("/login");
    }
  });
  return (
    <>
      <AppBar />
      <Box display="flex">
        <SideBar />
        <Box
          flexGrow={1}
          sx={{
            backgroundColor: "#eee",
            padding: "15px",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default index;
