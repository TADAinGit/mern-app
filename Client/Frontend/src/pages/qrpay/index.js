import React from "react";
import { Box } from "@mui/material";
import styles from "./QRPay.module.css";
import { useNavigate } from "react-router-dom";

export function QRPay() {
  const navigate = useNavigate();

  return (
    <>
      <div onClick={() => navigate("/")} className={styles.backHome}>
        Back
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <h2 style={{ textAlign: "center" }}>QR Payment</h2>
          <div className={styles.imgBox}>
            <img src="" alt="" width="100%" />
          </div>
          <a href="#" className={styles.btn}>
            Refresh QR
          </a>
          <div>
            <select name="voucher" className={styles.selectBox}>
              <option value="0">Select voucher</option>
              <option value="1">-50% voucher</option>
              <option value="2">-25% voucher</option>
              <option value="3">-2$ voucher</option>
            </select>
          </div>
        </div>
      </Box>
    </>
  );
}

export function QRPayResult() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          margin: "auto",
          display: "block",
          textAlign: "center",
          margin: "0 32px",
          width: "800px",
        }}
      >
        <h3>Payment Result</h3>
        <p>Payment Success/Failure</p>
        <div className={styles.infoBox}>
          <label htmlFor="idPay" className={styles.infoLbl}>
            ID Payment
          </label>
          <input
            type="text"
            disabled
            value={""}
            style={{ display: "block", width: "100%" }}
            className={styles.infoInput}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="amount" className={styles.infoLbl}>
            Amount
          </label>
          <input
            type="text"
            disabled
            value={""}
            style={{ display: "block", width: "100%" }}
            className={styles.infoInput}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="currentBalance" className={styles.infoLbl}>
            Current Balance
          </label>
          <input
            type="text"
            disabled
            value={""}
            style={{ display: "block", width: "100%" }}
            className={styles.infoInput}
          />
        </div>
        <a
          onClick={() => navigate("/")}
          className={styles.btn}
          style={{ width: "100%" }}
        >
          <span>Quay về trang chủ</span>
        </a>
        <a
          onClick={() => navigate("/qrpay")}
          className={styles.btn}
          style={{ width: "100%" }}
        >
          <span>Giao dịch mới</span>
        </a>
        <a href="#" className={styles.btn} style={{ width: "100%" }}>
          <span>Báo cáo</span>
        </a>
      </Box>
    </Box>
  );
}
