import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";

export default function ActivityCard({ id, title, categories }) {
  return (
    <div>
      <StyledCardContainer href={`/activities/${id}`}>
        <ImageContainer>
          <StyledImage
            priority
            alt={title}
            width={50}
            height={50}
            src="/assets/placeholder.jpg"
          />

          <HeartButton type="button">
            <Heart />
          </HeartButton>
        </ImageContainer>

        <StyledTitle>{title}</StyledTitle>

        <CategoriesWrapper>
          {categories?.map((category) => {
            return (
              <StyledCategories key={category._id}>
                <span>{category.name}</span>
              </StyledCategories>
            );
          })}
        </CategoriesWrapper>
      </StyledCardContainer>
    </div>
  );
}

const StyledCardContainer = styled(Link)`
  width: min(80vw, 22rem);
  min-height: 12rem;

  border: black solid 3px;
  color: var(--color-Headline);
  font-weight: 600;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 10px;
  text-align: center;
`;

const StyledTitle = styled.div`
  width: 100%;
  margin: 10px 0 0;
  text-align: left;
`;

const CategoriesWrapper = styled.div`
  margin-top: 10px;
  color: var(--color-Text);
  width: 100%;

  display: flex;
  justify-content: flex-start;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledCategories = styled.div`
  background-color: var(--color-Accent);
  font-family: var(--ui-Text);
  font-weight: 400;
  padding: 12px 24px;
  border-radius: 1rem;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
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
