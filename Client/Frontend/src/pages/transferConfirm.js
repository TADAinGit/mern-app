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
import style from "./moduleStyle";
import { useSelector, useDispatch } from "react-redux";

import { transfer } from "../redux/slice/balance";
import { otp } from "../redux/slice/user";

function transferConfirm() {
  const classes = style();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { transferData } = useSelector((state) => state.balance);
  const { receiver, amount, content, payer } = transferData;
  const { user } = useSelector((state) => state.user);
  const username = user ? user.data.username : "";

  const [i1, setI1] = useState('');
  const [i2, setI2] = useState('');
  const [i3, setI3] = useState('');
  const [i4, setI4] = useState('');
  const [i5, setI5] = useState('');
  const [i6, setI6] = useState('');

  const otpConfirm = () => {
    return i1+i2+i3+i4+i5+i6;
  }

  const handleConfirm = () => {
    const otp = otpConfirm();
    dispatch(transfer({ receiver, amount, content, username, payer, otp }))
      .unwrap()
      .then(() => navigate("/transferresult"))
      .catch((err) => console.log(err));
  };

  const handleResend = () => {
    dispatch(otp(username));
  };

  return (
    <Box>
      <IconButton
        size="small"
        edge="start"
        color="inherit"
        aria-label="back to transfer"
        onClick={() => navigate("/transfer")}
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
            Nhập mã OTP gồm 6 chữ số:
          </Typography>
          <Typography className={classes.titleDanger} variant="h3" noWrap>
            (Vui lòng không tiết lộ mã này cho người khác !)
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              height: "70px",
              marginBottom: "20px",
            }}
          >
            <TextField
              className={classes.inputNumber}
              color="primary"
              InputProps={{
                className: classes.inputNum,
              }}
              inputProps={{
                maxLength: 1,
                size: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) =>setI1(e.target.value)}
            />
            <TextField
              className={classes.inputNumber}
              color="primary"
              InputProps={{ className: classes.inputNum }}
              inputProps={{
                maxLength: 1,
                size: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) =>setI2(e.target.value)}
            />
            <TextField
              className={classes.inputNumber}
              color="primary"
              InputProps={{ className: classes.inputNum }}
              inputProps={{
                maxlLength: 1,
                size: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) =>setI3(e.target.value)}
            />
            <TextField
              className={classes.inputNumber}
              color="primary"
              InputProps={{ className: classes.inputNum }}
              inputProps={{
                maxLength: 1,
                size: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) =>setI4(e.target.value)}
            />
            <TextField
              className={classes.inputNumber}
              color="primary"
              InputProps={{ className: classes.inputNum }}
              inputProps={{
                maxLength: 1,
                size: 1,
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) =>setI5(e.target.value)}
            />
            <TextField
              className={classes.inputNumber}
              color="primary"
              InputProps={{ className: classes.inputNum }}
              inputProps={{
                maxLength: "1",
                size: "1",
                style: {
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                },
              }}
              onChange={(e) =>setI6(e.target.value)}
            />
          </Box>

          <Typography className={classes.titleMedium} variant="h3" noWrap>
            Mã sẽ hết hạn trong:
          </Typography>
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
              color: "#28559a",
            }}
          >
            <Button
              className={classes.buttonSmall}
              variant="contained"
              color="warning"
              sx={{ width: { xs: "100%", md: "49%" } }}
              onClick={handleResend}
            >
              Gửi lại mã OTP
            </Button>
            <Button
              className={classes.buttonSmall}
              variant="contained"
              color="success"
              sx={{ width: { xs: "100%", md: "49%" } }}
              // onClick={() => navigate("/transferresult")}
              onClick={() => handleConfirm()}
            >
              Xác nhận
            </Button>
          </Box>

          <TextField
            disabled
            className={classes.input}
            label="Số điện thoại người nhận"
            color="primary"
            value={transferData.receiver}
          />

          <TextField
            disabled
            className={classes.input}
            label="Số tiền"
            color="primary"
            value={transferData.amount}
          />

          <TextField
            disabled
            multiline
            label="Nội dung chuyển tiền"
            rows={5}
            inputprops={{
              style: {
                fontSize: "15px",
              },
            }}
            aria-label="detail of transfer"
            value={transferData.content}
            style={{
              fontSize: "15px",
              backgroundColor: "#fff",
              marginBottom: "20px",
              borderRadius: "5px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default transferConfirm;
