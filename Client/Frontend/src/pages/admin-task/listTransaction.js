import React, { useState } from "react";
import {
    Typography,
    Box,
    Button,
    Stack,
    IconButton,
    Divider
} from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { ArrowBackIos } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import style from "../moduleStyle.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getTransactions, setTransactionState } from "../../redux/slice/admin";

function listTransaction() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState(null);
    const [change, setChange] = React.useState(false);
    const { transactions } = useSelector(state => state.admin);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "transactionType", headerName: "Loại giao dịch", width: 120 },
        { field: "transactionTime", headerName: "Thời gian", width: 200 },
        { field: "amount", headerName: "Số tiền", width: 150 },
        { field: "transactionFee", headerName: "Phí giao dịch", width: 150, },
        { field: "transactionState", headerName: "Trạng thái", width: 150, },
        {
            field: "action",
            headerName: "Thao tác",
            width: 100,
            sortable: false,
            renderCell: (params) => {
                const handleClick = () => {
                    handleOpen();
                    setData(params.row)
                    // console.log(params);
                }
                return <Button onClick={handleClick}>Chi tiết</Button>;
            },
        },
    ];

    useEffect(() => {
        dispatch(getTransactions())
        setChange(false)
    }, [dispatch, change]);

    const handleSetStatus = (type, transactionId) => {
        dispatch(setTransactionState({ type, transactionId }))
            .unwrap()
            .then(() => {
                setChange(true);
                handleClose();
            })
            .catch(error => {
                console.log(error);
            });
    }

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
                    sx={{ width: { xs: "450px", sm: "600px", lg: "1000px" } }}
                >
                    <Typography
                        variant="h3"
                        noWrap
                        sx={{
                            padding: "10px",
                            fontWeight: "bold",
                            fontSize: "22px",
                            margin: "18px 0",
                            textAlign: "center",
                        }}
                    >
                        Danh sách người dùng
                    </Typography>
                    <div
                        style={{
                            background: "",
                            height: 400,
                            textAlign: "center",
                        }}
                    >
                        <DataGrid
                            rows={transactions.transactions}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[10]}
                        // checkboxSelection
                        />
                    </div>

                    <Modal
                        open={open}
                        onClose={handleClose}
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
                                    borderRadius: "10px 10px 0 0",
                                    color: "#202124",
                                }}
                                noWrap
                            >
                                Thông tin chi tiết
                            </Typography>
                            <Divider />
                            <Box sx={{
                                marginTop: "10px",
                                marginLeft: "20px",
                                padding: "15px 5px"
                            }}>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>ID:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.id : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Bên gửi</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.from : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Bên nhận:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.to : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Loại:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.transactionType : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Số tiền:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.amount : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Thời gian:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.transactionTime : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Trạng thái:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.transactionState : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Phí giao dịch:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.transactionFee : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Nội dung:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.transactionContent : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Phản hồi:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.transactionMessage : ""}
                                    </Typography>
                                </Stack>
                                {/*------------------------------------------------------------------------------- */}
                                <Stack
                                    sx={{
                                        marginRight: "20px",
                                    }}
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}>
                                    <Button
                                        onClick={() => {
                                            handleSetStatus('approve', data.id);
                                        }}
                                        disabled={data && data.transactionState === "waiting" ? false : true}
                                        variant="contained"
                                        fullWidth
                                        color="success">
                                        Phê duyệt
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleSetStatus('deny', data.id);
                                        }}
                                        disabled={data && data.transactionState === "waiting" ? false : true}
                                        variant="contained"
                                        fullWidth
                                        color="error">
                                        Từ chối
                                    </Button>
                                </Stack>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
}

export default listTransaction;
