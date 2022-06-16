import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  IconButton,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import "./style.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import style from "./moduleStyle.js";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../redux/slice/user";

function paymentHistory() {
  const navigate = useNavigate();
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "transactionType", headerName: "Loại giao dịch", width: 120 },
    { field: "transactionTime", headerName: "Thời gian", width: 150 },
    { field: "amount", headerName: "Số tiền", width: 150 },
    { field: "transactionFee", headerName: "Phí giao dịch", width: 150, },
    { field: "transactionState", headerName: "Trạng thái", width: 150, },
    // {
    //   field: "action",
    //   headerName: "Thao tác",
    //   width: 100,
    //   sortable: false,
    //   renderCell: (params) => {
    //     const handleClick = () => {
    //       handleOpen();
    //       // setData(params.row)
    //       // console.log(params);
    //     }
    //     return <Button onClick={handleClick}>Chi tiết</Button>;
    //   },
    // },
  ];
  const rows = [
    {
      id: 1,
      kindOfPayment: "Thanh toán",
      price: 300000,
      status: "Thành công",
    },
  ];

  const dispatch = useDispatch();
  const { user, histories } = useSelector(state => state.user);
  const username = user ? user.data.username : "";
  useEffect(() => {
    dispatch(getHistory({ username }))
    // setChange(false)
  }, [dispatch]);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sort, setSort] = React.useState("");

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const classes = style();

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
        >
          <Typography
            variant="h3"
            noWrap
            sx={{
              padding: "10px",
              fontWeight: "bold",
              fontSize: "22px",
              margin: "20px 0",
              textAlign: "center",
            }}
          >
            LỊCH SỬ GIAO DỊCH
          </Typography>

          <Typography
            variant="h3"
            noWrap
            sx={{
              fontSize: "15px",
              marginBottom: "10px",
            }}
          >
            Lịch sử giao dịch
          </Typography>
          <FormControl sx={{ width: "100%", marginBottom: "20px" }}>
            <Select
              value={sort}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={1}>Theo ngày</MenuItem>
              <MenuItem value={2}>Theo tháng</MenuItem>
              <MenuItem value={3}>Theo năm</MenuItem>
            </Select>
            {/* <FormHelperText>Without label</FormHelperText> */}
          </FormControl>

          <div
            style={{
              background: "",
              height: 400,
              textAlign: "center",
            }}
          >
            <DataGrid
              rows={histories}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
            />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="Chi tiết giao dịch"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "600px",
                bgcolor: "background.paper",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                borderRadius: "10px",
              }}
            >
              <Typography
                className={classes.titleFullsize}
                sx={{
                  backgroundColor: "#3778C2",
                  borderRadius: "10px 10px 0 0",
                  color: "#fff",
                }}
                noWrap
              >
                Chuyển khoản
              </Typography>
              <Typography
                className={classes.titleMedium}
                sx={{ marginTop: "20px" }}
                noWrap
              >
                Mã giao dịch: 01
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  textAlign: "center",
                  color: "#3778C2",
                }}
                noWrap
              >
                -200.000đ
              </Typography>
              <Box sx={{ padding: "0 10px" }}>
                <Box sx={{ display: "flex" }}>
                  <Typography className={classes.contentWeight} noWrap>
                    Trạng thái:
                  </Typography>
                  <Typography
                    className={classes.contentMedium}
                    sx={{ marginLeft: "10px" }}
                    noWrap
                  >
                    Giao dịch thành công
                  </Typography>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Typography className={classes.contentWeight} noWrap>
                    Thời gian:
                  </Typography>
                  <Typography
                    className={classes.contentMedium}
                    sx={{ marginLeft: "10px" }}
                    noWrap
                  >
                    20:15:41
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      </Box>
    </Box>
  );
}

export default paymentHistory;
