import styled from "styled-components";
import useDate from "@/hooks/useDate";

export default function Dates({ activity }) {
  const { startDate, endDate } = useDate(activity);

  if (!startDate || !endDate) {
    return null;
  }

  const formattedStart = new Date(startDate).toLocaleDateString("de-DE");
  const formattedEnd = endDate
    ? new Date(endDate).toLocaleDateString("de-DE")
    : null;

  const isSameDate = !formattedEnd || formattedStart === formattedEnd;

  return (
    <DateWrapper>
      {isSameDate ? formattedStart : `${formattedStart} – ${formattedEnd}`}
    </DateWrapper>
  );
}
const DateWrapper = styled.p`
  color: var(--color-grey-dark);
  font-size: 0.75rem;
`;
