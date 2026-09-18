import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import HeartButton from "@/components/ui/HeartButton/HeartButton";
import Dates from "@/components/Dates/Dates";

export default function ActivityCard({
  id,
  title,
  categories,
  imageUrl,
  activity,
}) {
  return (
    <StyledCardContainer href={`/activities/${id}`}>
      <ImageContainer>
        <StyledImage
          priority
          alt={title}
          fill
          src={imageUrl}
          sizes="(max-width: 22rem) 80vw, 22rem"
        />
        <HeartButton id={id} />
      </ImageContainer>

      <ContentWrapper>
        <TextWrapper>
          <Dates activity={activity} />
          <h2>{title}</h2>
        </TextWrapper>

        <CategoriesWrapper>
          {categories?.map((category) => {
            return (
              <StyledCategories key={category._id}>
                <span>{category.name}</span>
              </StyledCategories>
            );
          })}
        </CategoriesWrapper>
      </ContentWrapper>
    </StyledCardContainer>
  );
}

const StyledCardContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: var(--spacing-mll);

  min-width: 311px;
  color: var(--font-text-dark);
  text-decoration: none;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-ml);
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
`;

const CategoriesWrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  gap: var(--spacing-m);
  flex-wrap: wrap;
`;

const StyledCategories = styled.div`
  background-color: var(--color-accent);
  font-size: 0.75rem;
  padding: var(--padding-m) var(--padding-ml);
  border-radius: var(--border-radius-l);
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  border-radius: var(--border-radius-m);
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
`;
