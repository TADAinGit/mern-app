import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./components/mainlayout/";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Transfer from "./pages/transfer";
import TransferConfirm from "./pages/transferConfirm";
import TransferResult from "./pages/transferResult";
import Deposit from "./pages/deposit";
import DepositResult from "./pages/depositResult";
import Withdraw from "./pages/withdraw";
import WithdrawResult from "./pages/withdrawResult";
import PaymentHistory from "./pages/paymentHistory";
import SavingDeposit from "./pages/savingDeposit";
import SavingDepositResult from "./pages/savingDepositResult";
import ListTransaction from "./pages/admin-task/listTransaction";
import ListUser from "./pages/admin-task/listUser";
import { QRPay, QRPayResult } from "./pages/qrpay";
import { PayBill, PayBillResult } from "./pages/paybills";
import { PhoneCard, PhoneCardResult } from "./pages/buyphonecard";
import Profile from "./pages/profile";
import PasswordChange from "./pages/password";
import Auth from "./pages/authentication";
import FirstLogin from "./pages/authentication/firstlogin";
import {
  ResetPassWord,
  ResetPassWordConfirm,
  RePassWord
} from "./pages/authentication/resetpassword";

function App() {
  const isAdmin = true;
  return (
    <div>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/resetpassword" element={<ResetPassWord />} />
        <Route
          path="/resetpasswordconfirm"
          element={<ResetPassWordConfirm />}
        />
        <Route path="/repassword" element={<RePassWord />} />
        <Route path="/firstlogin" element={<FirstLogin />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/transferconfirm" element={<TransferConfirm />} />
          <Route path="/transferresult" element={<TransferResult />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/depositresult" element={<DepositResult />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/withdrawresult" element={<WithdrawResult />} />
          <Route path="/paymenthistory" element={<PaymentHistory />} />
          <Route path="/savingdeposit" element={<SavingDeposit />} />
          <Route
            path="/savingdepositresult"
            element={<SavingDepositResult />}
          />

          <Route path="/qrpay" element={<QRPay />} />
          <Route path="/qrpayresult" element={<QRPayResult />} />
          <Route path="/paybills" element={<PayBill />} />
          <Route path="/paybillresult" element={<PayBillResult />} />
          <Route path="/buyphonecard" element={<PhoneCard />} />
          <Route path="/buyphonecardresult" element={<PhoneCardResult />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/passwordchange" element={<PasswordChange />} />

          <Route
            path="/listuser"
            element={isAdmin ? <ListUser /> : <Navigate to="/" />}
          />
          <Route
            path="/listtransaction"
            element={isAdmin ? <ListTransaction /> : <Navigate to="/" />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
