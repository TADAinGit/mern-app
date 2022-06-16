import React from "react";
import { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { useDispatch, useSelector } from "react-redux";
import { profile } from "../../redux/slice/user";
import numeral from "numeral";

function Profile() {
  //   const [phoneNumber, setPhoneNumber] = useState[0];
  //   const [email, setEmail] = useState[""];
  //   const [fullName, setFullName] = useState[""];
  //   const [birthDay, setBirthDay] = useState[""];
  //   const [address, setAddress] = useState[""];
  //   const [username, setUsername] = useState[""];
  //   const [balance, setBalance] = useState[0];
  //   const [accountStatus, setAccountStatus] = useState[""];
  const dispatch = useDispatch();
  const { userFull, user } = useSelector((state => state.user))
  let username = user ? user.data.username : "";
  useEffect(() => {
    dispatch(profile(username))
  }, [dispatch]);

  return (
    <>
      <div className={styles.title}>Thông tin cá nhân</div>
      <div className={styles.container}>
        <div className={styles.infoBox}>
          <label className={styles.infoLbl}>
            Số điện thoại
          </label>
          <input
            type="text"
            value={userFull ? userFull.phoneNumber : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Email
          </label>
          <input
            type="text"
            value={userFull ? userFull.email : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Họ và tên
          </label>
          <input
            type="text"
            value={userFull ? userFull.fullName : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Ngày sinh
          </label>
          <input
            type="text"
            value={userFull ? userFull.dateOfBirth : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Địa chỉ
          </label>
          <input
            type="text"
            value={userFull ? userFull.address : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Tên đăng nhập
          </label>
          <input
            type="text"
            value={userFull ? userFull.userName : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Số dư
          </label>
          <input
            type="text"
            value={userFull ? numeral(userFull.accountBalance).format(0,0) : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setBalance(e.target.value)}
          />
        </div>
        <div className={styles.infoBox}>
          <label htmlFor="" className={styles.infoLbl}>
            Trạng thái tài khoản
          </label>
          <input
            type="text"
            value={userFull ? userFull.userStatus : ""}
            className={styles.infoInput}
            readOnly
          //   onChange={(e) => setAccountStatus(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}

export default Profile;
