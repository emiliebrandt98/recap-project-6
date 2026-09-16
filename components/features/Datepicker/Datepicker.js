import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDate from "@/hooks/useDate";
export default function DateInnput() {
  const { startDate, endDate, setStartDate, setendDate } = useDate();
  return (
    <DateContainer>
      <StartDate>
        <label htmlFor="startDate">Start:</label>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          id="startDate"
          name="startDate"
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setendDate(date);
          }}
          minDate={new Date()}
          showIcon
        />
      </StartDate>
      <EndDate>
        <label htmlFor="endDate">End:</label>
        <DatePicker
          minDate={startDate}
          dateFormat="dd.MM.yyyy"
          id="endDate"
          name="endDate"
          selected={endDate}
          onChange={(date) => setendDate(date)}
          showIcon
        />
      </EndDate>
    </DateContainer>
  );
}

const DateContainer = styled.div`
  display: flex;
`;

const StartDate = styled.div`
  display: flex;
  flex-direction: column;
`;

const EndDate = styled.div`
  display: flex;
  flex-direction: column;
`;
