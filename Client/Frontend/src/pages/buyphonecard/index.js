import React, { useEffect, useState } from "react";
import styles from "./BuyPhoneCard.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import numeral from "numeral";

import { buyCard, paymentSlice } from "../../redux/slice/payment";

const types = ["Viettel", "Mobifone", "Vinaphone"];
const prices = [10000, 20000, 50000, 100000, 200000, 500000];

export function PhoneCard() {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("0");
  const [amount, setAmount] = useState(1);
  const [cost, setCost] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const username = user.data.username || "";

  function handleType(event) {
    setType(event.target.innerText);
  }
  function handlePrice(event) {
    setPrice(event.target.innerText);
  }
  function handleAmountAdd() {
    if (amount === 99) {
      return;
    }
    setAmount((amount) => amount + 1);
  }
  function handleAmountSub() {
    if (amount === 1) {
      return;
    }
    setAmount((amount) => amount - 1);
  }

  useEffect(() => {
    setCost(parseInt(price) * amount);
  }, [price, amount]);

  useEffect(() => {
    setTotal(price * amount);
  }, [price, amount]);

  function handleSubmit() {
    dispatch(
      paymentSlice.actions.updatePaymentData({
        hostName: type,
        cost: price,
        amount,
      })
    );
    dispatch(buyCard({ hostName: type, cost: price, amount, username }))
      .unwrap()
      .then(() => navigate("/buyphonecardresult"))
      .catch((err) => console.log(err));
  }

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h3>MUA THẺ DI ĐỘNG</h3>
      <div>
        {types.map((i) => {
          return (
            <button
              key={i}
              className={
                i === type ? `${styles.btn} ${styles.btnSelected}` : styles.btn
              }
              onClick={(e) => handleType(e)}
            >
              {i}
            </button>
          );
        })}
      </div>
      <div className={styles.line}></div>
      <p className={styles.title}>Chọn mệnh giá</p>
      <div>
        {prices.map((i) => {
          return (
            <button
              key={i}
              className={
                i === parseInt(price)
                  ? `${styles.btn} ${styles.btnSelected}`
                  : styles.btn
              }
              onClick={(e) => handlePrice(e)}
            >
              {i}
            </button>
          );
        })}
      </div>
      <div className={styles.line}></div>
      {/* <p className={styles.title}>Other info</p> */}
      <div className={styles.amountBox}>
        <label htmlFor="amount">Số lượng:</label>
        <div className={styles.amountControl}>
          <button onClick={() => handleAmountSub()}>-</button>
          <input type="text" disabled value={amount} />
          <button onClick={() => handleAmountAdd()}>+</button>
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }} className={styles.box}>
        <div style={{ flexGrow: 1, textAlign: "start" }}>
          <p style={{ margin: "8px 0 0" }}>Tổng tiền:</p>
          <p style={{ margin: "0 0 8px" }}>{numeral(total).format(0, 0)} VND</p>
        </div>
        <div style={{ flexGrow: 0, alignSelf: "center" }}>
          <div onClick={() => handleSubmit()} className={styles.btnConfirm}>
            XÁC NHẬN
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneCardResult() {
  const navigate = useNavigate();
  const { paymentData, paymentResult } = useSelector((state) => state.payment);
  return (
    <div className={styles.container} style={{ textAlign: "start" }}>
      <div style={{ textAlign: "center" }}>
        <h2>KẾT QUẢ GIAO DỊCH</h2>
        <h4
          style={{
            color:
              (paymentResult && paymentResult.success ? "green" : "red") ||
              "black",
          }}
        >
          Mua mã thẻ{" "}
          {paymentResult && paymentResult.success ? "thành công" : "thất bại"}
        </h4>
      </div>

      <div className={styles.infoBox}>
        <label htmlFor="" className={styles.infoLabel}>
          Loại
        </label>
        <input
          type="text"
          className={styles.infoText}
          disabled
          value={paymentData.hostName}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLabel}>
            Mệnh giá
          </label>
          <input
            type="text"
            className={styles.infoText}
            disabled
            value={numeral(paymentData.cost).format(0, 0)}
          />
        </div>
        <div style={{ width: "5%" }}></div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLabel}>
            Số lượng
          </label>
          <input
            type="text"
            className={styles.infoText}
            disabled
            value={paymentData.amount}
          />
        </div>
      </div>
      <div className={styles.infoBox}>
        <label htmlFor="" className={styles.infoLabel}>
          Tổng tiền
        </label>
        <input
          type="text"
          className={styles.infoText}
          disabled
          value={numeral(paymentData.cost * paymentData.amount).format(0, 0)}
        />
      </div>
      <div className={styles.infoBox}>
        <label htmlFor="" className={styles.infoLabel}>
          Nội dung
        </label>
        <input
          disabled
          type="text"
          className={styles.infoText}
          defaultValue={
            paymentResult && paymentResult.transaction.transactionContent
          }
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "32px", display: "block" }}>
        <div onClick={() => navigate("/")} className={styles.btnResult}>
          Quay về trang chủ
        </div>
        <div
          onClick={() => navigate("/buyphonecard")}
          className={styles.btnResult}
        >
          Giao dịch mới
        </div>
        <div href="#" className={styles.btnResult}>
          Báo cáo
        </div>
      </div>
    </div>
  );
}
