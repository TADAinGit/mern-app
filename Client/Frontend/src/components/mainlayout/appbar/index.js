import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Badge,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  Avatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import Searching from "./Search.js";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";
import { logout } from "../../../redux/slice/user.js";

const pages = [
  {
    label: "Trang chủ",
    url: "/",
  },
  {
    label: "Chuyển tiền",
    url: "/transfer",
  },

  {
    label: "Nạp tiền",
    url: "/deposit",
  },

  {
    label: "Rút tiền",
    url: "/withdraw",
  },
  {
    label: "Thanh toán mã QR",
    url: "/qrpay",
  },
  {
    label: "Thanh toán hóa đơn",
    url: "/paybills",
  },
  {
    label: "Mua mã thẻ di động",
    url: "/buyphonecard",
  },
  {
    label: "Gửi tiết kiệm",
    url: "/savingdeposit",
  },
  {
    label: "Lịch sử giao dịch",
    url: "/paymenthistory",
  },
];
const userMenuLogin = [
  {
    action: "profile",
    label: "Thông tin cá nhân",
    url: "/profile",
  },
  {
    action: "changePassword",
    label: "Đổi mật khẩu",
    url: "/passwordchange",
  },
  {
    action: "logout",
    label: "Đăng xuất",
    url: "/login",
  },
];

const useStyles = () => ({
  appbarColor: {
    // backgroundColor: "#28559A",
    backgroundImage: "linear-gradient(40deg, #0068d7 0%, #008fff 100%)",
  },
});

export const Header = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [openMenu, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [anchorE1, setAnChorE1] = useState(null);
  const [anchorSideBar, setAnchorSideBar] = useState(false);
  const open = Boolean(anchorE1);

  const handleClick = (event) => {
    setAnChorE1(event.currentTarget);
  };

  const handleClose = () => {
    setAnChorE1(null);
  };

  const handleClickSideBar = () => {
    setAnchorSideBar(true);
  };

  const handleCloseSideBar = () => {
    setAnchorSideBar(false);
  };

  const handleLogout = () => {
    dispatch(logout())
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1, boxShadow: 2 }}>
      <AppBar position="static" sx={classes.appbarColor}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2, display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Drawer open={openMenu} onClose={() => setOpen(false)}>
            <Box
              sx={{ width: 250, height: "100%", background: "#28559A" }}
              onClick={() => setOpen(false)}
            >
              <List>
                {pages.map((menu, index) => (
                  <ListItemButton
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                    key={menu.url}
                    selected={menu.url === location.pathname}
                    onClick={() => navigate(menu.url)}
                  >
                    <ListItemText sx={{ color: "#fff" }} primary={menu.label} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Drawer>

          <Typography
            variant="h5"
            noWrap
            sx={{
              display: { xs: "none", md: "flex", paddingRight: "10px" },
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => navigate("/")}
          >
            METAMASK
          </Typography>

          <Box flexGrow={1} />

          {/* <Searching /> */}

          <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
            <IconButton
              id="user-btn"
              aria-controls={open ? "user-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <Badge invisible={visible} color="warning" variant="dot">
                <Avatar src="/imgs/logo.jpg"  />
              </Badge>
            </IconButton>
            <Menu
              id="user-menu"
              anchore1={anchorE1}
              open={open}
              onClose={handleClose}
              MenuListProps={{ "aria-labelledby": "user-btn" }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{
                mt: "48px",
              }}
            >
              <List onClick={handleClose}>
                {userMenuLogin.map((menu) => (
                  <MenuItem
                    key={menu.url}
                    selected={menu.url === location.pathname}
                    onClick={() => {
                      if (menu.action != "logout") {
                        navigate(menu.url);
                      } else {
                        // console.log("logout")
                        handleLogout();
                      }
                    }}
                  >
                    {menu.label}
                  </MenuItem>
                ))}
              </List>
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton onClick={handleClickSideBar}>
              <MoreIcon sx={{ color: "white" }} />
            </IconButton>
            <Drawer
              anchor="right"
              open={anchorSideBar}
              onClose={handleCloseSideBar}
            >
              <Box
                role="presentation"
                onClick={handleCloseSideBar}
                sx={{ width: "250px", height: "100%", background: "#28559A" }}
              >
                <IconButton sx={{ display: "block", margin: "0 auto" }}>
                  <Avatar src="" alt="" />
                </IconButton>

                <Divider sx={{ background: "#fff" }} />

                <List>
                  {userMenuLogin.map((menu) => (
                    <ListItemButton
                      key={menu.url}
                      selected={menu.url === location.pathname}
                      onClick={() => {
                        if (menu.action != "logout") {
                          navigate(menu.url);
                        } else {
                          // console.log("logout")
                          handleLogout();
                        }
                      }}
                    >
                      <ListItemText
                        primary={menu.label}
                        sx={{ textAlign: "center", color: "#fff" }}
                      />
                    </ListItemButton>
                  ))}
                </List>
                <Divider sx={{ backgroundColor: "#0067e6" }} />
              </Box>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
