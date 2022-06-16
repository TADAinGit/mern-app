import styles from "./CardCustom.module.css";
import { ButtonCustom } from "../button";
import React from "react";

function CardCustom({ urlImg, hrefBtn, title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.imgBx}>
        <img
          src={urlImg}
          alt=""
          style={{ maxWidth: "100%", borderRadius: "4px" }}
        />
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.content}>
        {children}
        <ButtonCustom href={hrefBtn}>Đi tới</ButtonCustom>
      </div>
    </div>
  );
}

export default CardCustom;
