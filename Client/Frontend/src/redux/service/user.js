import axios from "axios";
import header from "./header";

const API_URL = "http://localhost:8080/";

const register = (registerData) => {
  return axios.post(API_URL + "register", registerData);
};

const login = (userName, passWord) => {
  return axios.post(API_URL + "login", { userName, passWord });
};

const profile = (username) => {
  return axios.post(API_URL + "profile", { username }, { headers: header() });
};

const logOut = async () => {
  await localStorage.removeItem("user");
};

const otp = (username, email) => {
  return axios.post(API_URL + "sendOTP", { username, email }, { headers: header() });
};

const validateOTP = async (otp) => {
  return axios.post(API_URL + "OTPValidate", { otp }, { headers: header() });
};

const resetpassword = (email, password) => {
  console.log(password);
  return axios.post(API_URL + "resetPassword", { email, password }, { headers: header() });
}

const changePassword = (
  newPassword,
  retypeNewPassword,
  currentPassword,
  username
) => {
  return axios.post(
    API_URL + "changePassword",
    { newPassword, retypeNewPassword, currentPassword, username },
    { headers: header() }
  );
};

const getUserTransaction = (username) => {
  return axios.post(API_URL + "history", { username }, { headers: header() });
};

const firstLogin = (username, passWord, repassWord) => {
  return axios.post(API_URL + "firstlogin", { passWord, repassWord, username });
};

const userService = {
  register,
  login,
  profile,
  logOut,
  changePassword,
  getUserTransaction,
  otp,
  firstLogin,
  validateOTP,
  resetpassword
};
export default userService;
