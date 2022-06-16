import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Typography,
  Box,
  Stack,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import HistoryIcon from "@mui/icons-material/History";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import GroupIcon from "@mui/icons-material/Group";
import "react-dropdown/style.css";
import Calendar from "./calendar/";
import Timer from "./Timer";
import PaidIcon from "@mui/icons-material/Paid";
import { profile } from "../../../redux/slice/user";
import Avatar from "@mui/material/Avatar";

var numeral = require("numeral");

const userTask = [
  {
    label: "Trang chủ",
    url: "/",
    icon: <HomeIcon />,
  },
  {
    label: "Chuyển tiền",
    url: "/transfer",
    icon: <CurrencyExchangeIcon />,
  },

  {
    label: "Nạp tiền",
    url: "/deposit",
    icon: <CreditCardIcon />,
  },

  {
    label: "Rút tiền",
    url: "/withdraw",
    icon: <AccountBalanceWalletIcon />,
  },

  {
    label: "Lịch sử giao dịch",
    url: "/paymenthistory",
    icon: <HistoryIcon />,
  },
  {
    label: "Mua thẻ điện thoại",
    url: "/buyphonecard",
    icon: <ContactPhoneIcon />,
  },
];

const adminTask = [
  {
    label: "Danh sách người dùng",
    url: "/listuser",
    icon: <GroupIcon />,
  },
  {
    label: "Danh sách giao dịch",
    url: "/listtransaction",
    icon: <PaidIcon />,
  },
];

function SideBar() {
  const [anchorE1, setAnChorE1] = useState(null);
  const open = Boolean(anchorE1);

  const handleClick = (event) => {
    setAnChorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnChorE1(null);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const dispatch = useDispatch();

  // useEffect()

  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLogin, userFull } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.balance);
  let username = user ? user.data.username : "";

  useEffect(() => {
    // console.log(isLogin);
    let checkUser
    if (!user && !isLogin) {
      checkUser = setTimeout(() => {
        navigate("/login");
      }, 1000);
    } else if (user && !user.data.firstLoginFlag) {
      setTimeout(() => {
        navigate("/firstlogin");
      }, 1000);
    }

    return () => {
      clearTimeout(checkUser);
    }
  }, [user, isLogin]);

  useEffect(() => {
    if (username !== '') {
      dispatch(profile(username));
    }
  }, [status, dispatch]);

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(70deg, #0068d7 0%, #008fff 100%)",
        width: 350,
        padding: "20px",
        display: { xs: "none", md: "block" },
      }}
    >
      {/* Check admin or user */}
      {user !== null && user.data.accountRole === "admin" ? (
        <Box>
          <Box
            sx={{
              background: "#fff",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              padding: "10px 0",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            {/* LOGO */}
            <Stack
              sx={{
                alignItems: "center",
                display: "flex",
                padding: "15px 0",
              }}
            >
              <img src="/imgs/logo.jpg" width={"30px"} />
            </Stack>

            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              {user ? user.data.fullName : ""}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              Role: {user ? user.data.accountRole : ""}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <Box
            sx={{
              background: "#fff",
              // boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
              padding: "10px 0",
              borderRadius: "10px",
              marginBottom: "20px",
            }}
          >
            <Stack
              sx={{
                alignItems: "center",
                display: "flex",
                padding: "15px 0",
              }}
            >
              <img src="/imgs/logo.jpg" width={"40px"} />
            </Stack>

            <Typography
              variant="h6"
              noWrap
              sx={{
                color: "green",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              {user ? user.data.fullName : ""}
            </Typography>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              Số tài khoản: {user ? user.data.username : ""}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              Số điện thoại: {user ? user.data.phoneNumber : ""}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "15px",
              }}
            >
              Số dư: {userFull ? numeral(userFull.accountBalance).format(0,0) : ""}
            </Typography>
          </Box>
        </Box>
      )}

      <Divider sx={{ marginBottom: "20px", background: "#fff" }} />

      <Box
        sx={{
          background: "#fff",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
          // boxShadow:
          //   "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          // boxShadow: "0px 0px 12px 2px lightblue",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <Calendar />
        <Timer />
      </Box>
      <List>
        {(user !== null && user.data.accountRole === "admin"
          ? adminTask
          : userTask
        ).map((menu, index) => (
          <ListItemButton
            sx={{ color: "#fff" }}
            key={index}
            selected={menu.url === location.pathname}
            onClick={() => navigate(menu.url)}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{menu.icon}</ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default SideBar;
