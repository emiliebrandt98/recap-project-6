import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInnput({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
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
            setEndDate(date);
          }}
          showIcon
        />
      </StartDate>
      <EndDate>
        <label htmlFor="endDate">End:</label>
        <DatePicker
          dateFormat="dd.MM.yyyy"
          id="endDate"
          name="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
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
