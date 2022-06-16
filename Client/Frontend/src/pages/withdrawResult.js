import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";

import style from "./moduleStyle";


function withdrawResult() {
  const navigate = useNavigate();
  const classes = style();

  const { withdrawData, withdrawResult } = useSelector(
    (state) => state.balance
  );
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
            sx={withdrawResult.success ? { color: "green" } : { color: "red" }}
          >
            {withdrawResult &&
            withdrawResult.transaction.transactionState === "waiting"
              ? withdrawResult.transaction.transactionMessage
              : withdrawResult.success
              ? "Rút tiền thành công"
              : "Rút tiền thất bại"}
          </Typography>

          {/* <TextField
            className={classes.input}
            label="Mã giao dịch"
            color="secondary"
            disabled
          /> */}

          <TextField
            className={classes.input}
            label="Mã thẻ"
            color="secondary"
            disabled
            value={withdrawData.cardNumber}
          />

          <TextField
            className={classes.input}
            label="Số tiền"
            color="secondary"
            disabled
            value={`${numeral(parseInt(withdrawData.amount) +
              withdrawData.fee).format(0,0)} (đã bao gồm phí 5% chuyển)`}
          />

          <Button
            className={classes.button}
            variant="contained"
            color="success"
            onClick={() => navigate("/")}
          >
            Quay lại trang chủ
          </Button>
          <Box
            sx={{
              display: { xs: "block", md: "flex" },
              justifyContent: "space-between",
              color: "#28559a",
              marginBottom: "20px",
            }}
          >
            <Button
              className={classes.buttonSmall}
              variant="contained"
              sx={{ width: { xs: "100%", md: "49%" } }}
              onClick={() => navigate("/withdraw")}
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

export default withdrawResult;
