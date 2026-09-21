import styled, { css } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateInput({
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
            if (!endDate || date > endDate) {
              setEndDate(date);
            }
          }}
          showIcon
          autoComplete="off"
          placeholderText="dd.mm.jjjj"
        />
      </StartDate>

      <EndDate>
        <label htmlFor="endDate">End:</label>
        <DatePicker
          minDate={startDate || new Date()}
          disabled={!startDate}
          dateFormat="dd.MM.yyyy"
          id="endDate"
          name="endDate"
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showIcon
          autoComplete="off"
          placeholderText="dd.mm.jjjj"
        />
      </EndDate>
    </DateContainer>
  );
}

const DateContainer = styled.div`
  display: flex;
  gap: var(--border-radius-m);
  width: 100%;
`;

const dateBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
  flex: 1;

  label {
    font-size: 0.75rem;
    color: var(--font-info);
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container input {
    height: 40px;
    width: 100%;
    padding: var(--padding-m) var(--padding-xl);
    border-radius: var(--border-radius-s);
    border: 1px solid var(--color-grey-dark);
    background-color: transparent;
    color: var(--color-grey-dark);
    outline: none;

    &:focus {
      outline: none;
      border-color: var(--color-primary);
    }

    &:disabled {
      background-color: var(--color-grey-light);
      cursor: not-allowed;
      opacity: 0.7;
    }
  }

  .react-datepicker__calendar-icon {
    position: absolute;
    top: 28%;
    left: var(--padding-m);
    right: auto;
    padding: 0;
    fill: var(--color-grey-dark);
  }
`;

const StartDate = styled.div`
  ${dateBoxStyles}
`;

const EndDate = styled.div`
  ${dateBoxStyles}
`;
