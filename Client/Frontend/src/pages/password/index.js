import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../redux/slice/user";

import styles from "./Password.module.css";

function PasswordChange() {
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const { user } = useSelector((state) => state.user);
  const username = user ? user.data.username : "";
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(
      changePassword({
        newPassword: newPwd,
        retypeNewPassword: confirmPwd,
        currentPassword: currentPwd,
        username,
      })
    )
      .unwrap()
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className={styles.title}>ĐỔI MẬT KHẨU</div>
      <div className={styles.formBox}>
        <form action="" onsubmit="return false">
          <div className={styles.inputBox}>
            <label htmlFor="" className={styles.lbl}>
              Mật khẩu hiện tại
            </label>
            <input
              type="password"
              name=""
              className={styles.inp}
              autoComplete="off"
              autoFocus
              onChange={(e) => setCurrentPwd(e.target.value)}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="" className={styles.lbl}>
              Mật khẩu mới
            </label>
            <input
              type="password"
              name=""
              className={styles.inp}
              autoComplete="off"
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </div>
          <div className={styles.inputBox}>
            <label htmlFor="" className={styles.lbl}>
              Xác nhận mật khẩu mới
            </label>
            <input
              type="password"
              name=""
              className={styles.inp}
              autoComplete="off"
              onChange={(e) => setConfirmPwd(e.target.value)}
            />
          </div>
          <input type="button" className={styles.confirm} value="XÁC NHẬN" onClick={() => handleSubmit()} />
        </form>
      </div>
    </>
  );
}

export default PasswordChange;
