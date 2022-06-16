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
import { ArrowBackIos } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";

import style from "./moduleStyle";
import { balanceSlice, withdraw as withdrawB } from "../redux/slice/balance";

function withdraw() {
  const navigate = useNavigate();
  const classes = style();
  const [card, setCard] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const username = user ? user.data.username : "";

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [idCard, setIdCard] = useState(0);
  const [expiredDate, setexpiredDate] = useState("");
  const [cvv, setCvv] = useState(0);
  const [amount, setAmount] = useState(0);

  const handleChange = (event) => {
    setCard(event.target.value);
  };

  const convertNumeral = (value) => {
    return numeral(value).value();
  };

  const handleSubmit = () => {
    const oriAmount = convertNumeral(amount);
    dispatch(
      balanceSlice.actions.updateData({
        cardNumber: idCard,
        expiredDate,
        cvv,
        amount: oriAmount,
      })
    );
    console.log(username);
    dispatch(
      withdrawB({
        cardNumber: idCard,
        expiredDate,
        cvv,
        amount: oriAmount,
        username,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/withdrawresult");
      })
      .catch((err) => console.log(err));
  };

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
          className={classes.box}
          sx={{ width: { xs: "450px", sm: "600px", lg: "800px" } }}
          component="form"
        >
          <Typography className={classes.titleFullsize} variant="h3" noWrap>
            RÚT TIỀN
          </Typography>

          <TextField
            className={classes.inputSmall}
            label="Số thẻ"
            color="primary"
            sx={{ width: "100%" }}
            onChange={(e) => setIdCard(e.target.value)}
          />
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
            }}
          >
            <TextField
              className={classes.inputSmall}
              type="date"
              color=""
              sx={{ width: { xs: "100%", md: "49%" } }}
              onChange={(e) => setexpiredDate(e.target.value)}
            />

            <TextField
              className={classes.inputSmall}
              label="Mã CVV"
              color=""
              sx={{ width: { xs: "100%", md: "49%" } }}
              onChange={(e) => setCvv(e.target.value)}
            />
          </Box>

          <TextField
            className={classes.input}
            label="Số tiền"
            color=""
            onChange={(e) => setAmount(numeral(e.target.value).format(0, 0))}
            value={amount}
          />

          <Typography className={classes.contentWeight} variant="h3" noWrap>
            Phí giao dịch: {numeral(convertNumeral(amount) * 0.05).format(0,0)} vnd
          </Typography>

          <Button
            className={classes.button}
            variant="contained"
            color="success"
            // onClick={() => navigate("/withdrawresult")}
            onClick={() => {
              handleSubmit();
            }}
          >
            Rút tiền
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default withdraw;
