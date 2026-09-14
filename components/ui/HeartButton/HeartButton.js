import styled from "styled-components";
import { Heart } from "lucide-react";
import useFavorites from "@/hooks/useFavorites";

export default function HeartButton({ activity, id }) {
  const activityId = activity?._id || id; //
  const { isFavorite, onToggle } = useFavorites();

  return (
    <HeartContainer
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle(activityId);
      }}
      type="button"
    >
      <StyledHeart $active={isFavorite.includes(activityId)} />
    </HeartContainer>
  );
}

const HeartContainer = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;
  background-color: var(--color-Bookmark);
  color: white;
  cursor: pointer;
`;

const StyledHeart = styled(Heart)`
  fill: ${(props) => (props.$active ? "white" : "none")};
`;
