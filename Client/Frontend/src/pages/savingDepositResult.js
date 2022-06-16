import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import style from "./moduleStyle.js";

function savingDeposit() {
  const navigate = useNavigate();
  const classes = style();
  const [format, setFormat] = React.useState("");

  const handleChange = (event) => {
    setFormat(event.target.value);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box>
      <Box sx={{ display: "flex" }}>
        <Box
          className={classes.box}
          sx={{ width: { xs: "450px", sm: "600px", lg: "800px" } }}
        >
          <Typography className={classes.titleFullsize} variant="h3" noWrap>
            KẾT QUẢ
          </Typography>

          <TextField
            className={classes.input}
            label="Số tiền đã gửi"
            color="secondary"
            disabled
          />
          <TextField
            className={classes.input}
            label="Số tiền cần gửi"
            color="secondary"
            disabled
          />
          <TextField
            className={classes.input}
            label="Mức lãi suất"
            color="secondary"
            disabled
          />

          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
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
              onClick={() => navigate("/savingdeposit")}
            >
              Gửi tiếp
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

export default savingDeposit;
