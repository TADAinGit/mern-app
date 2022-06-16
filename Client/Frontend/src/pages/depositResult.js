import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import style from "./moduleStyle";
import { useSelector } from "react-redux";
import numeral from "numeral";

function depositResult() {
  const classes = style();
  const navigate = useNavigate();
  const { transactionDeposit, depositData } = useSelector(
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
            sx={
              transactionDeposit.success ? { color: "green" } : { color: "red" }
            }
          >
            {transactionDeposit.success
              ? "Nạp tiền thành công"
              : "Nạp tiền thất bại"}
          </Typography>

          <TextField
            className={classes.input}
            label="Mã giao dịch"
            color="secondary"
            disabled
          />

          <TextField
            className={classes.input}
            label="Số tiền"
            color="secondary"
            value={numeral(depositData.amount).format(0,0)}
            disabled
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
            }}
          >
            <Button
              className={classes.buttonSmall}
              variant="contained"
              sx={{ width: { xs: "100%", md: "49%" } }}
              onClick={() => navigate("/deposit")}
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

export default depositResult;
