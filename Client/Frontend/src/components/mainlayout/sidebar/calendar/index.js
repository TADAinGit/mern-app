import React, { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import styles from "./Calendar.module.css";

function CalendarCustom() {
  const [date, setDate] = useState(new Date());
  return (
    <Calendar
      onChange={setDate}
      value={date}
      className={styles.customCalendar}
    />
  );
}

export default CalendarCustom;
