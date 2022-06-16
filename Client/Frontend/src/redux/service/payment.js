import axios from "axios";


const API_URL = "http://localhost:8080/";

const buyCard = (hostName, cost, amount, username) => {
  return axios.post(API_URL + "api/payment/phonecard", {
    hostName,
    cost,
    amount,
    username,
  });
};

const paymentService = {
  buyCard,
};
export default paymentService;
