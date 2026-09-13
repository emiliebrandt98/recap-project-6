import Image from "next/image";
import styled from "styled-components";
import { Heart } from "lucide-react";

export default function ActivityInfo({ activity }) {
  if (!activity) return null;

  return (
    <>
      <ImageContainer>
        <StyledImage
          alt={activity.title || "Activity Image"}
          width={100}
          height={100}
          src="/assets/placeholder.jpg"
          priority
        />

        <HeartButton type="button">
          <Heart />
        </HeartButton>
      </ImageContainer>

      <StyledTitle>
        <h2>{activity.title}</h2>

        <StyledCategories>
          {activity?.categories?.map((category) => {
            return (
              <StyledCategory key={category._id}>
                {category.name}
              </StyledCategory>
            );
          })}
        </StyledCategories>
      </StyledTitle>

      <StyledDescription>{activity.description}</StyledDescription>

      <StyledLocation>
        <p>{activity.area}</p>
        <p>{activity.country}</p>
      </StyledLocation>
    </>
  );
}

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const HeartButton = styled.button`
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

const StyledTitle = styled.div`
  width: 100%;
  margin: 10px 0 0;
  text-align: left;
  overflow-wrap: break-word;

  h2 {
    margin: 0;
    color: var(--color-Headline);
    font-family: var(--headline-Text);
    font-weight: 700;
  }
`;

const StyledCategories = styled.div`
  width: 100%;
  margin-top: 10px;

  display: flex;
  justify-content: flex-start;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledCategory = styled.span`
  background-color: var(--color-Accent);
  color: var(--color-Text);
  font-family: var(--ui-Text);
  font-weight: 400;
  padding: 12px 24px;
  border-radius: 1rem;
`;

const StyledDescription = styled.p`
  margin-top: 20px;
  color: var(--color-Text);
  font-family: var(--ui-Text);
  font-weight: 400;
  line-height: 1.5;
  overflow-wrap: break-word;
`;

const StyledLocation = styled.section`
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  gap: 5px;

  p {
    margin: 0;
    color: var(--color-Text);
    font-family: var(--ui-Text);
  }
`;
