import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export default function ActivityCard({ id, title, categories }) {
  return (
    <StyledGrid>
      <StyledCardContainer href={`/activities/${id}`}>
        <Image
          priority
          alt={title}
          width={100}
          height={100}
          src="/assets/placeholder.jpg"
        />

        <StyledTitle>{title} </StyledTitle>

        <StyledCategories>
          {categories?.map((category) => {
            return <span key={category._id}>{category.name}</span>;
          })}
        </StyledCategories>
      </StyledCardContainer>
    </StyledGrid>
  );
}

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledCardContainer = styled(Link)`
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  text-align: center;
`;

const StyledTitle = styled.div`
  width: 100%;
  margin: 10px 0 0;
  text-align: center;
  overflow-wrap: break-word;
`;

const StyledCategories = styled.div`
  width: auto;
  display: flex;
  justify-content: center;
  gap: 5px;
  flex-wrap: wrap;
`;
