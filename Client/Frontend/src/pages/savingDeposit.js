import React, { useState } from "react";
import {
  Typography,
  Box,
  Button,
  IconButton,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import "./style.css";
import { ArrowBackIos } from "@mui/icons-material";
import style from "./moduleStyle.js";

function savingDeposit() {
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
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="back to home"
      >
        <ArrowBackIos />
      </IconButton>
      <Box sx={{ display: "flex" }}>
        <Box
          className={classes.box}
          component="form"
          sx={{ width: { xs: "450px", sm: "600px", lg: "800px" } }}
        >
          <Typography className={classes.titleFullsize} variant="h3" noWrap>
            GỬI TIẾT KIỆM
          </Typography>
          <TextField
            className={classes.input}
            label="Số dư khả dụng"
            color="secondary"
          />
          <TextField
            className={classes.input}
            label="Số tiền cần gửi"
            color="secondary"
          />

          <FormControl className={classes.input}>
            <InputLabel color="secondary">Hình thức</InputLabel>
            <Select
              labelId="format"
              value={format}
              label="format"
              onChange={handleChange}
            >
              <MenuItem value={0}>Không kỳ hạn</MenuItem>
              <MenuItem value={1}>Có kỳ hạn</MenuItem>
              <MenuItem value={2}>Bậc thang</MenuItem>
            </Select>
          </FormControl>
          <TextField
            className={classes.input}
            label="Mức lãi suất"
            color="secondary"
          />
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Gửi tiết kiệm
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default savingDeposit;
