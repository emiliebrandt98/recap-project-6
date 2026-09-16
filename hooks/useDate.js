
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
export default function useDate() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(startDate);
  function handleDate() {
    setStartDate(new Date());
    setendDate(new Date());
  }
  return { startDate, setStartDate, endDate, setEndDate, handleDate };
}
