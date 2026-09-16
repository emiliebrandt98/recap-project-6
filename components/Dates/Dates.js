import styled from "styled-components";
import useDate from "@/hooks/useDate";

export default function Dates({ activity }) {
  const { startDate, endDate } = useDate(activity);
  return (
    <DateWrapper>
      <p>Start: {new Date(startDate).toLocaleDateString("de-DE")}</p>
      <p>Ende: {new Date(endDate).toLocaleDateString("de-DE")}</p>
    </DateWrapper>
  );
}
const DateWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
