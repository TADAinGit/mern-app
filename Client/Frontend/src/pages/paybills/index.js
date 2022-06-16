import React, { useState, useEffect } from "react";
import styles from "./PayBills.module.css";
import { useNavigate } from "react-router-dom";

const types = [
  { content: "Electric Bill", color: "#ff9800" },
  { content: "Water Bill", color: "#005cff" },
  { content: "Internet Bill", color: "#4fc329" },
];

export function PayBill() {
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const color = types.find((item) => item.content === type);

  function handleType(e) {
    setType(e.target.innerText);
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Thanh toán hóa đơn</h3>
      <div className={styles.containerBtn}>
        {types.map((item) => {
          return (
            <button
              key={item.content}
              className={
                type === item.content
                  ? `${styles.btn} ${styles.btnSelect}`
                  : styles.btn
              }
              style={{ "--clr": item.color }}
              onClick={(e) => handleType(e)}
            >
              {item.content}
            </button>
          );
        })}
      </div>
      <div
        className={styles.containerBill}
        style={{
          "--clr": color ? color.color : "#fff",
          display: type ? "block" : "none",
        }}
      >
        <div className={styles.boxInput}>
          <label htmlFor="">Account balance</label>
          <input type="text" disabled />
        </div>
        <div className={styles.boxInput}>
          <label htmlFor="">Fill info</label>
        </div>
        <div className={styles.fillBox}>
          <div>
            <div className={styles.twoItem}>
              <div className={styles.boxInput}>
                <label htmlFor="">NCC:</label>
                <input type="text" />
              </div>
              <div style={{ width: "5%" }}></div>
              <div className={styles.boxInput}>
                <label htmlFor="">Account balance:</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.twoItem}>
              <div className={styles.boxInput}>
                <label htmlFor="">Assign payment:</label>
                <input type="text" />
              </div>
              <div style={{ width: "5%" }}></div>
              <div className={styles.boxInput}>
                <label htmlFor="">ID customer:</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.twoItem}>
              <div className={styles.boxInput}>
                <label htmlFor="">Amount:</label>
                <input type="text" />
              </div>
              <div style={{ width: "5%" }}></div>
              <div className={styles.boxInput}>
                <label htmlFor="">Transaction cost:</label>
                <input type="text" />
              </div>
            </div>
            <div className={styles.boxInput}>
              <label htmlFor="">Address:</label>
              <input type="text" />
            </div>
          </div>
        </div>
        <div className={styles.totalBox}>
          Total: <span>0 vnd</span>
        </div>
        <div
          className={styles.btnConfirm}
          style={{ "--clr": color ? color.color : "#fff" }}
        >
          <div onClick={() => navigate("/paybillresult")}>Confirm</div>
        </div>
      </div>
    </div>
  );
}

export function PayBillResult() {
  const navigate = useNavigate();

  return (
    <div>
      <h3 className={styles.title}>Payment Result</h3>
      <h4 className={styles.title}>Payment Success/ Failure</h4>
      <div>
        <div className={styles.boxInput}>
          <label htmlFor="">ID payment</label>
          <input type="text" disabled />
        </div>
        <div className={styles.twoItem}>
          <div className={styles.boxInput}>
            <label htmlFor="">NCC:</label>
            <input type="text" />
          </div>
          <div style={{ width: "5%" }}></div>
          <div className={styles.boxInput}>
            <label htmlFor="">ID customer:</label>
            <input type="text" />
          </div>
        </div>
        <div className={styles.twoItem}>
          <div className={styles.boxInput}>
            <label htmlFor="">Name:</label>
            <input type="text" />
          </div>
          <div style={{ width: "5%" }}></div>
          <div className={styles.boxInput}>
            <label htmlFor="">Assign Payment:</label>
            <input type="text" />
          </div>
        </div>
        <div className={styles.boxInput}>
          <label htmlFor="">Address:</label>
          <input type="text" />
        </div>
        <div className={styles.boxInput}>
          <label htmlFor="">Amount:</label>
          <input type="text" />
        </div>
        <div className={styles.totalBox}>
          Total: <span>0 vnd</span>
        </div>
        <div>
          <button onClick={() => navigate("/")} className={styles.btnResult}>
            Back to home
          </button>
          <button href="#" className={styles.btnResult}>
            New Payment
          </button>
          <button href="#" className={styles.btnResult}>
            Report issue
          </button>
        </div>
      </div>
    </div>
  );
}
