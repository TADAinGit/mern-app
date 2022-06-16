import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBackIos } from "@mui/icons-material";
import style from "./moduleStyle";
import { deposit, saveDepositData } from "../redux/slice/balance.js";

var numeral = require("numeral");

function transfer() {
  const navigate = useNavigate();
  const classes = style();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const [card, setCard] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [cvvCode, setCvvCode] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);

  const convertedAmount = (e) => {
    let data = numeral(e.target.value).format(0, 0);
    setDepositAmount(data);
  };
  const originalAmount = (value) => {
    return numeral(value).value();
  };

  const { depositData } = useSelector((state) => state.balance);
  const { user } = useSelector((state) => state.user);
  const username = user ? user.data.username : "";


  function handleConfirm() {
    const oriAmount = originalAmount(depositAmount);

    let saveData = {
      cardNumber: card,
      expiredDate: expireDate,
      cvv: cvvCode,
      amount: oriAmount,
    };

    dispatch(saveDepositData(saveData)).unwrap();

    dispatch(
      deposit({
        cardNumber: card,
        expiredDate: expireDate,
        cvv: cvvCode,
        amount: oriAmount,
        username,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/depositresult");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <Box>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="back to home"
        onClick={() => navigate("/")}
      >
        <ArrowBackIos /> Back
      </IconButton>
      <Box sx={{ display: "flex" }}>
        <Box
          component="form"
          className={classes.box}
          sx={{ width: { xs: "450px", sm: "600px", lg: "800px" } }}
        >
          <Typography className={classes.titleFullsize} variant="h3" noWrap>
            NẠP TIỀN VÀO VÍ
          </Typography>

          <TextField
            className={classes.input}
            label="Nhập số thẻ"
            color="primary"
            onChange={(e) => setCard(e.target.value)}
          />

          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <TextField
              type="date"
              className={classes.inputSmall}
              color=""
              sx={{ width: { xs: "100%", md: "49%" } }}
              onChange={(e) => setExpireDate(e.target.value)}
            />

            <TextField
              className={classes.inputSmall}
              label="Mã CVV"
              color=""
              sx={{ width: { xs: "100%", md: "49%" } }}
              onChange={(e) => setCvvCode(e.target.value)}
            />
          </Box>

          <TextField
            className={classes.input}
            label="Số tiền"
            color="primary"
            onChange={convertedAmount}
            value={depositAmount}
          />

          <Button
            className={classes.button}
            variant="contained"
            color="success"
            onClick={handleConfirm}
          >
            Nạp tiền
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default transfer;
