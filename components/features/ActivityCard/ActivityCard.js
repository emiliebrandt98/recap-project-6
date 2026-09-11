import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function ActivityCard({ id, title, categories }) {
  return (
    <div>
      <StyledCardContainer href={`/activities/${id}`}>
        <Image
          priority
          alt={title}
          width={100}
          height={100}
          src="/assets/placeholder.jpg"
        />

        <StyledTitle>{title} </StyledTitle>

        <CategoriesWrapper>
          {categories?.map((category) => {
            return (
              <StyledCategories>
                <span key={category._id}>
                  <div>{category.name}</div>
                </span>
              </StyledCategories>
            );
          })}
        </CategoriesWrapper>
      </StyledCardContainer>
    </div>
  );
}

const StyledCardContainer = styled(Link)`
  border: black solid 3px;
  color: var(--color-Headline);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 10px;
  text-align: center;
`;

const StyledTitle = styled.div`
  width: 100%;
  margin: 10px 0 0;
  text-align: center;
  overflow-wrap: break-word;
`;

const CategoriesWrapper = styled.div`
  margin-top: 10px;
  color: var(--color-Text);
  width: auto;
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
`;

const StyledCategories = styled.div`
  background-color: var(--color-Accent);
  font-family: var(--ui-Text);
  font-weight: 400;
  padding: 5px;
  border-radius: 10px;
`;
