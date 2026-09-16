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
          minDate={new Date()}
          onChange={(date) => {
            setStartDate(date);
            setEndDate(date);
          }}
          showIcon
          autoComplete="off"
        />
      </StartDate>

      <EndDate>
        <label htmlFor="endDate">End:</label>
        <DatePicker
          minDate={startDate || new Date()}
          dateFormat="dd.MM.yyyy"
          id="endDate"
          name="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showIcon
          autoComplete="off"
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
