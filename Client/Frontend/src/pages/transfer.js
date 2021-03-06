import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  TextField,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@mui/material";
import "./style.css";
import { ArrowBackIos } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { saveTransferData } from "../redux/slice/balance.js";
import { otp } from "../redux/slice/user.js";

import style from "./moduleStyle";

var numeral = require("numeral");

function transfer() {
  const classes = style();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { transferData } = useSelector((state) => state.balance);

  const [phone, setPhone] = useState(transferData.receiver || "");
  const [amount, setAmount] = useState(transferData.amount || 0);

  const [content, setContent] = useState(transferData.content || "");
  const [payer, setPayer] = useState(transferData.payer || "");

  const convertedAmount = (e) => {
    let data = numeral(e.target.value).format(0, 0);
    setAmount(data);
  };

  const originalAmount = (value) => {
    return numeral(value).value();
  };

  const dispatch = useDispatch();

  const username = user ? user.data.username : "";

  function handleConfirm() {
    const oriAmount = originalAmount(amount);

    let saveData = {
      receiver: phone,
      amount: oriAmount,
      content: content,
      payer: payer,
    };

    dispatch(saveTransferData(saveData))
      .unwrap()
      .then(() => {
        dispatch(otp({ username: username, email: "" }));
        navigate("/transferConfirm");
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
          className={classes.box}
          component="form"
          sx={{ width: { xs: "450px", sm: "600px", lg: "800px" } }}
        >
          <Typography className={classes.titleFullsize} variant="h3" noWrap>
            CHUY???N TI???N
          </Typography>

          <TextField
            className={classes.input}
            label="Nh???p s??? ??i???n tho???i"
            color="primary"
            onChange={(e) => {
              setPhone(e.target.value);
            }}
            value={phone}
          />

          <TextField
            className={classes.input}
            label="S??? ti???n"
            color="primary"
            onChange={convertedAmount}
            value={amount}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              color: "#28559a",
              marginBottom: "10px",
            }}
          >
            <Typography className={classes.contentWeight} variant="h3" noWrap>
              Ph?? giao d???ch: {numeral(originalAmount(amount) * 0.05).format(0, 0)}
            </Typography>
          </Box>

          <FormControl>
            <FormLabel id="transactionFee">Ph?? giao d???ch</FormLabel>
            <RadioGroup
              row
              name="radio-buttons-group"
              onChange={(e) => setPayer(e.target.value)}
            >
              <FormControlLabel
                value={user ? user.data.phoneNumber : null}
                control={<Radio />}
                label="Ng?????i chuy???n tr???"
              />
              <FormControlLabel
                value={phone}
                control={<Radio />}
                label="Ng?????i nh???n tr???"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            label={"N???i dung chuy???n ti???n"}
            multiline
            aria-label="detail of transfer"
            rows={5}
            style={{
              backgroundColor: "#fff",
              fontSize: "15px",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
            placeholder="Nh???p n???i dung chuy???n ti???n"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <Button
            className={classes.button}
            variant="contained"
            color="success"
            onClick={handleConfirm}
          >
            Ti???p t???c
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default transfer;
