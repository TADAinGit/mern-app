import axios from "axios";
import header from "./header";

const API_URL = "http://localhost:8080/";

const transfer = (receiver, amount, content, username, payer, otp) => {
  return axios.post(API_URL + "api/balance/transfer", {
    receiver,
    amount,
    content,
    username,
    payer,
    otp
  },
    { headers: header() });
};

const withdraw = (cardNumber, expiredDate, cvv, amount, username) => {
  return axios.post(
    API_URL + "api/balance/withdraw",
    {
      cardNumber,
      expiredDate,
      cvv,
      amount,
      username,
    },
    { headers: header() }
  );
};

const deposit = (cardNumber, expiredDate, cvv, amount, username) => {
  return axios.post(API_URL + "api/balance/deposit", {
    cardNumber,
    expiredDate,
    cvv,
    amount,
    username,
  },
    { headers: header() });
};

const balanceService = {
  transfer,
  withdraw,
  deposit
};
export default balanceService;
