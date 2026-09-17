import { useState, useEffect } from "react";


export default function useDate(activity) {
  const [startDate, setStartDate] = useState(null);

  const [endDate, setEndDate] = useState(null);
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
