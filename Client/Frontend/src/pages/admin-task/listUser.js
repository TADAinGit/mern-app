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
import { getUsers, setUserStatus } from "../../redux/slice/admin";

function listUser() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [data, setData] = useState(null);
    const [change, setChange] = React.useState(false);
    const { users } = useSelector(state => state.admin);

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "userName", headerName: "Username", width: 150 },
        { field: "fullName", headerName: "Họ tên", type: "number", width: 250 },
        { field: "phoneNumber", headerName: "Số điện thoại", width: 150, },
        { field: "userStatus", headerName: "Trạng thái", width: 150, },
        {
            field: "action",
            headerName: "Thao tác",
            width: 140,
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
        dispatch(getUsers())
        setChange(false)
    }, [dispatch, change]);

    const handleSetStatus = (status, username) => {
        dispatch(setUserStatus({ username, status }))
            .unwrap()
            .then(() => {
                // navigate('/listuser');
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
                            rows={users.users}
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
                                    <Typography className={classes.contentWeight} noWrap>Username:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.userName : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Họ tên:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.fullName : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Email:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.email : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Số điện thoại:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.phoneNumber : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Ngày sinh:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.dateOfBirth : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Địa chỉ:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.address : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Trạng thái:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.userStatus : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Số dư:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.accountBalance : ""}
                                    </Typography>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Typography className={classes.contentWeight} noWrap>Phân quyền:</Typography>
                                    <Typography className={classes.contentMedium} sx={{ marginLeft: "10px" }} noWrap>
                                        {data ? data.accountRole : ""}
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
                                            handleSetStatus('active', data.userName);
                                        }}
                                        disabled={data && data.userStatus === "active" ? true : false}
                                        variant="contained"
                                        fullWidth
                                        color="success">
                                        Xác minh
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleSetStatus('disable', data.userName);
                                        }}
                                        disabled={data && data.userStatus === "lock" ? true : false}
                                        variant="contained"
                                        fullWidth
                                        color="error">
                                        Hủy
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleSetStatus('updating', data.userName);
                                        }}
                                        disabled={data && data.userStatus === "lock" ? true : false}
                                        variant="contained"
                                        fullWidth
                                        color="warning">
                                        Yêu cầu
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

export default listUser;
