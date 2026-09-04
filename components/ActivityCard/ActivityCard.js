import styled from "styled-components";
import Image from "next/image";

export default function ActivityCard({ activities }) {
  return (
    <StyledGrid>
      {activities.map((activity) => {
        return (
          <StyledCardContainer key={activity._id}>
            <Image
              priority="eager"
              alt={activity.title}
              width={100}
              height={100}
              src="/assets/placeholder.jpg"
            />

            <StyledTitle>
              {activity.title}
              <StyledCategories>
                {activity.categories.map((category) => {
                  return <span key={category._id}>{category.name}</span>;
                })}
              </StyledCategories>
            </StyledTitle>
          </StyledCardContainer>
        );
      })}
    </StyledGrid>
  );
}

const StyledGrid = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  width: 200px;
  height: 150px;

  text-align: center;
`;

const StyledTitle = styled.div`
  width: 100%;
  margin: 10px 0 0;
  text-align: center;
  overflow-wrap: break-word;
`;

const StyledCategories = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
`;
