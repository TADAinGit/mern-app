import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  box: {
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    // width: "800px",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "10px",
    padding: "0 20px 20px 20px",
  },
  titleFullsize: {
    fontWeight: "bold",
    fontSize: "22px",
    padding: "20px 0",
    textAlign: "center",
  },
  titleDanger: {
    color: "red",
    fontWeight: "bold",
    fontSize: "15px",
    paddingBottom: "20px",
    textAlign: "center",
  },
  titleSuccess: {
    color: "green",
    fontWeight: "bold",
    fontSize: "15px",
    paddingBottom: "20px",
    textAlign: "center",
  },
  titleMedium: {
    fontWeight: "bold",
    fontSize: "15px",
    paddingBottom: "20px",
    textAlign: "center",
  },
  contentMedium: {
    fontSize: "15px",
    marginBottom: "10px",
  },
  contentWeight: {
    fontWeight: "bold",
    fontSize: "15px",
    marginBottom: "10px",
  },
  input: {
    background: "#fff",
    borderRadius: "4px",
    width: "100%",
    marginBottom: "20px",
  },
  inputNoMargin: {
    background: "#fff",
    borderRadius: "4px",
    width: "100%",
  },
  inputSmall: {
    background: "#fff",
    borderRadius: "4px",
    marginBottom: "20px",
  },
  inputNumber: {
    background: "#fff",
    borderRadius: "4px",
    width: "70px",
    height: "70px",
    marginBottom: "20px",
  },
  inputNum: {
    height: "70px",
  },
  button: {
    width: "100%",
    height: "60px",
    margin: "0 auto",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  buttonNoBorderR: {
    width: "100%",
    height: "60px",
    margin: "0 auto",
    marginBottom: "20px",
  },
  buttonNoMargin: {
    width: "100%",
    height: "60px",
    margin: "0 auto",
    borderRadius: "10px",
    ".css-ke5b6m-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "red",
    },
  },
  buttonSmall: {
    // width: "49%",
    height: "60px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
});

function moduleStyle() {
  const classes = useStyles();
  return classes;
}

export default moduleStyle;
