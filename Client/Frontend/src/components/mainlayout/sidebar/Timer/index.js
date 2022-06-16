import React, { useState, useEffect } from "react";

import styles from "./Timer.module.css";

function Timer() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    ampm: "AM",
  });

  useEffect(() => {
    let currentTime;
    const timeUpdate = setInterval(() => {
      currentTime = new Date();
      setTime((prevTime) => ({
        hours: currentTime.getHours(),
        minutes: currentTime.getMinutes(),
        seconds: currentTime.getSeconds(),
        ampm: prevTime.ampm,
      }));
    }, 1000);
    return () => {
      clearInterval(timeUpdate);
    };
  }, []);

  useEffect(() => {
    setTime((prevTime) => ({
      ...prevTime,
      ampm: time.hours < 12 ? "AM" : "PM",
    }));
  }, [time.hours]);

  return (
    <div style={{ textAlign: "center" }}>
      <span>{time.hours < 10 ? `0${time.hours}` : time.hours} : </span>
      <span>{time.minutes < 10 ? `0${time.minutes}` : time.minutes} : </span>
      <span>{time.seconds < 10 ? `0${time.seconds}` : time.seconds} </span>
      <span>{time.ampm}</span>
    </div>
  );
}

export default Timer;
