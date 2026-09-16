import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";

export default function useDate(activity) {
  const [startDate, setStartDate] = useState(new Date());

  const [endDate, setEndDate] = useState(startDate);
  useEffect(() => {
    if (activity?.startDate) {
      setStartDate(new Date(activity.startDate));
    }

    if (activity?.endDate) {
      setEndDate(new Date(activity.endDate));
    }
  }, [activity]);
  return { startDate, setStartDate, endDate, setEndDate };
}
