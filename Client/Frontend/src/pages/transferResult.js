import React, { useState } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./moduleStyle";
import { useSelector, useDispatch } from "react-redux";
import { saveTransferData } from "../redux/slice/balance";
import numeral from "numeral";

function transferResult() {
  const classes = style();
  const navigate = useNavigate();
  const { transactionTransfer, transferData } = useSelector(
    (state) => state.balance
  );

  const dispatch = useDispatch();

  const handleReset = () =>
    dispatch(
      saveTransferData({ receiver: "", amount: 0, content: "", payer: "" })
    ).then(() => {
      navigate("/");
    });

  const handleNewTransfer = () =>
    dispatch(
      saveTransferData({ receiver: "", amount: 0, content: "", payer: "" })
    ).then(() => {
      navigate("/transfer");
    });

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box
          className={classes.box}
          sx={{ width: { xs: "450px", sm: "600px", lg: "800px" } }}
        >
          <Typography className={classes.titleFullsize} variant="h3" noWrap>
            KẾT QUẢ GIAO DỊCH
          </Typography>
          <Typography
            className={classes.titleMedium}
            variant="h3"
            noWrap
            sx={
              transactionTransfer.success
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {transactionTransfer &&
            transactionTransfer.transaction.transactionState === "waiting"
              ? transactionTransfer.transaction.transactionMessage
              : transactionTransfer.success
              ? "Chuyển tiền thành công"
              : "Chuyển tiền thất bại"}
          </Typography>

          <TextField
            className={classes.input}
            label="Mã giao dịch"
            color="secondary"
            disabled
          />

          <TextField
            className={classes.input}
            label="Số tài khoản người nhận"
            color="secondary"
            disabled
            value={transferData.receiver}
          />
          <TextField
            className={classes.input}
            label="Số tiền"
            color="secondary"
            disabled
            value={numeral(transferData.amount).format(0,0)}
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
          <Button
            className={classes.button}
            variant="contained"
            color="success"
            onClick={handleReset}
          >
            Quay lại trang chủ
          </Button>
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
              sx={{ width: { xs: "100%", md: "49%" } }}
              onClick={handleNewTransfer}
            >
              Giao dịch mới
            </Button>
            <Button
              className={classes.buttonSmall}
              variant="contained"
              color="error"
              sx={{ width: { xs: "100%", md: "49%" } }}
            >
              Báo cáo
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default transferResult;
