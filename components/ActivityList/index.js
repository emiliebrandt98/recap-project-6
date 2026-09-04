import Image from "next/image";
import useSWR from "swr";
import styled from "styled-components";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ActivityList() {
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div>
      <StyledHeader>Activities List</StyledHeader>

      <StyledGrid>
        {activities.map((activity) => {
          return (
            <StyledCardContainer key={activity._id}>
              <Image
                alt="activity"
                width={100}
                height={100}
                src="/assets/placeholder.jpg"
              />

              <StyledTitle>{activity.title}</StyledTitle>
            </StyledCardContainer>
          );
        })}
      </StyledGrid>
    </div>
  );
}

const StyledHeader = styled.h1`
  text-align: center;
`;

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 200px);
  justify-content: center;
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

const StyledTitle = styled.p`
  width: 100%;
  margin: 10px 0 0;
  text-align: center;
  overflow-wrap: break-word;
`;
