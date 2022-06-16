import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./ButtonCustom.module.css";

export function ButtonCustom({ href, children }) {
  const navigate = useNavigate();
  return (
    <div className={styles.container} onClick={() => navigate(href)}>
      <a className={styles.button}>
        <span className={styles.content}>{children}</span>
      </a>
    </div>
  );
}
