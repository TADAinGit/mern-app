import React from "react";
import { Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

export const useStyles = () => ({
  leftPanel: {
    pointerEvents: "all",
    padding: "3rem 17% 2rem 12%",
    gridRow: { xs: "1 / 2", md: "unset" },
  },
  rightPanel: {
    pointerEvents: "none",
    padding: "3rem 12% 2rem 17%",
    gridRow: { xs: "3 / 4", md: "unset" },
    "& .image, & .content": {
      transform: { xs: "translate(0,300px)", md: "translate(800px,0)" },
    },
  },
});

export const LinkButton = styled((props) => {
  const { to, children, ...other } = props;

  return (
    <Button component={Link} to={to} {...other}>
      {children}
    </Button>
  );
})(({ theme }) => ({
  color: "#fff",
  borderRadius: 49,
  margin: 0,
  background: "none",
  border: "2px solid #fff",
  width: "130px",
  height: "41px",
  fontWeight: 600,
  fontSize: "0.8rem",
  [theme.breakpoints.down("md")]: {
    width: 110,
    height: 35,
    fontSize: "0.7rem",
  },
}));

export const AuthWrapper = styled("div")(({ theme }) => ({
  position: "relative",
  width: "100%",
  backgroundColor: "#fff",
  minHeight: "100vh",
  overflow: "hidden",
  "&:before": {
    content: '""',
    position: "absolute",
    height: 2000,
    width: 2000,
    top: "-10%",
    right: "48%",
    transform: "translateY(-50%)",
    backgroundImage: "linear-gradient(-45deg, #0068d7 0%, #008fff 100%)",
    transition: "1.8s ease-in-out",
    borderRadius: "50%",
    zIndex: 6,
  },
  "&.sign-up-mode:before": {
    transform: "translate(100%, -50%)",
    right: "52%",
  },
  "&.sign-up-mode .left-panel .image , &.sign-up-mode .left-panel .content": {
    transform: "translateX(-800px)",
  },
  "&.sign-up-mode .signin-signup": {
    left: "25%",
  },
  "&.sign-up-mode form.sign-up-form": {
    opacity: 1,
    zIndex: 2,
  },
  "&.sign-up-mode form.sign-in-form": {
    opacity: 0,
    zIndex: 1,
  },
  "&.sign-up-mode .right-panel .image, &.sign-up-mode .right-panel .content": {
    transform: "translateX(0%)",
  },
  "&.sign-up-mode .left-panel": {
    pointerEvents: "none",
  },
  "&.sign-up-mode .right-panel": {
    pointerEvents: "all",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: 800,
    height: "100vh",
    "&.sign-up-mode .signin-signup": {
      left: "50%",
      top: "5%",
      transform: "translate(-50%, 0)",
    },
    "&:before": {
      width: 1500,
      height: 1500,
      transform: "translateX(-50%)",
      left: "30%",
      bottom: "70%",
      right: "initial",
      top: "initial",
      transition: "2s ease-in-out",
    },
    "&.sign-up-mode:before": {
      transform: "translate(-50%, 100%)",
      bottom: "32%",
      right: "initial",
    },
    "&.sign-up-mode .left-panel .image , &.sign-up-mode .left-panel .content": {
      transform: "translateY(-300px)",
    },
    "&.sign-up-mode .right-panel .image, &.sign-up-mode .right-panel .content": {
      transform: "translateY(0)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    padding: "1.5rem",
    "&:before": {
      bottom: "72%",
      left: "50%",
    },
    "&.sign-up-mode:before": {
      bottom: "28%",
      left: "50%",
    },
  },
}));

export const PanelWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  height: "100%",
  width: "100%",
  top: 0,
  left: 0,
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gridTemplateRows: "1fr 2fr 1fr",
  },
}));
export const Panel = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-around",
  textAlign: "center",
  zIndex: 6,
  "& .content": {
    color: "#fff",
    transition: "transform 0.9s ease-in-out",
    transitionDelay: "0.6s",
  },
  "& h3": {
    fontWeight: 600,
    lineHeight: 1,
    fontSize: "1.5rem",
  },
  "& p": {
    fontSize: "0.95rem",
    padding: "0.7rem 0",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "2.5rem 8%",
    gridColumn: "1 / 2",
    "& .content": {
      paddingRight: "15%",
      transition: "transform 0.9s ease-in-out",
      transitionDelay: "0.8s",
    },
    "& h3": {
      fontSize: "1.2rem",
    },
    "& p": {
      fontSize: "0.7rem",
      padding: "0.5rem 0",
      margin: "10px 0",
    },
  },
  [theme.breakpoints.down("sm")]: {
    "& .content": {
      padding: "0.5rem 1rem",
    },
  },
}));

export const PanelImage = styled("img")(({ theme }) => ({
  width: "100%",
  transition: "transform 1.1s ease-in-out",
  transitionDelay: "0.4s",
  [theme.breakpoints.down("md")]: {
    width: "200px",
    transition: "transform 0.9s ease-in-out",
    transitionDelay: "0.6s",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const FormContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
}));

export const FormWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  left: "75%",
  width: "50%",
  transition: "1s 0.7s ease-in-out",
  display: "grid",
  gridTemplateColumns: "1fr",
  zIndex: 5,
  "& form": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "0rem 5rem",
    transition: "all 0.2s 0.7s",
    overflow: "hidden",
    gridColumn: "1 / 2",
    gridRow: "1 / 2",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
    top: "95%",
    transform: "translate(-50%, -100%)",
    transition: "1s 0.8s ease-in-out",
    left: "50%",
    "& form": {
      padding: "0 1.5rem",
    },
  },
}));

export const SigninForm = styled("form")(({ theme }) => ({
  zIndex: 2,
}));
export const SignupForm = styled("form")(({ theme }) => ({
  zIndex: 1,
  opacity: 0,
}));
export const FormTitle = styled("h2")(({ theme }) => ({
  fontSize: "2.2rem",
  color: "#444",
  marginBottom: 10,
}));
export const TextReset = styled("p")(({ theme }) => ({
  color: "#008fff",
  marginTop: "10px",
  padding: "10px",
  "&:hover": { cursor: "pointer", background: "#f0e7e7", borderRadius: "20px" },
}));
export const FormControl = styled("div")(({ theme }) => ({
  maxWidth: 380,
  width: "100%",
  backgroundColor: "#f0f0f0",
  margin: "10px 0",
  height: 55,
  borderRadius: 55,
  display: "grid",
  gridTemplateColumns: "15% 85%",
  padding: "0 0.4rem",
  position: "relative",
  overflow: "hidden",
  "& input": {
    background: "none",
    outline: "none",
    border: "none",
    lineHeight: 1,
    fontWeight: 500,
    fontSize: "1.1rem",
    color: "#333",
    padding: "0 10px 0 0",
  },
  "& input:-webkit-autofill": {
    backgroundColor: "white!important",
    background: "none",
  },
  "& input::placeholder": {
    color: "#aaa",
    fontWeight: 500,
  },
  "& svg": {
    lineHeight: "55px",
    color: "#acacac",
    transition: "0.5s",
    fontSize: "1.6rem",
    margin: "auto",
  },
}));
export const AuthButton = styled(Button)(({ theme }) => ({
  width: 150,
  backgroundColor: "#008fff",
  border: "none",
  outline: "none",
  height: "49px",
  borderRadius: 49,
  color: "#fff",
  textTransform: "uppercase",
  fontWeight: 600,
  margin: "10px 0",
  "&:hover": {
    backgroundColor: "#0268ff",
  },
}));

export const SocialButton = styled((props) => {
  const { children, ...other } = props;
  return (
    <IconButton {...other} component={Link}>
      {children}
    </IconButton>
  );
})(({ theme }) => ({
  height: 46,
  width: 46,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 0.45rem",
  color: "#333",
  borderRadius: "50%",
  border: "1px solid #333",
  textDecoration: "none",
  fontSize: "1.1rem",
  "&:hover": {
    color: "#4481eb",
    borderColor: "#4481eb",
  },
}));
