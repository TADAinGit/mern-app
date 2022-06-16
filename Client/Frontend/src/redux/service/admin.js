import axios from "axios";
import header from "./header";

const API_URL = "http://localhost:8080/admin";

const getListUser = () => {
    return axios.get(API_URL + "/list");
};

const getListTransaction = () => {
    return axios.get(API_URL + "/listtransaction");
}

const setStatus = (username, status) => {
    return axios.post(API_URL + "/setuserstatus", { username, status });
};

const approveTransaction = (transactionID) => {
    return axios.post(API_URL + "/approve", { transactionID });
}

const denyTransaction = (transactionID) => {
    return axios.post(API_URL + "/denied", { transactionID });
}

const adminService = {
    getListUser,
    setStatus,
    getListTransaction,
    approveTransaction,
    denyTransaction
};
export default adminService;