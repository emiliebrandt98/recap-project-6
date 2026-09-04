import Image from "next/image";
import styled from "styled-components";

export default function ActivityInfo({ activity }) {
  return (
    <>
      <Image
        alt={activity.title}
        width={100}
        height={100}
        src="/assets/placeholder.jpg"
      />
      <StyledTitle>
        <h2>{activity.title}</h2>
        <StyledCategories>
          {activity.categories.map((categorie) => {
            <span key={categorie._id}>{categorie.name}</span>;
          })}
        </StyledCategories>
      </StyledTitle>
      <p>{activity.description}</p>
      <section>
        <p>{activity.area}</p>
        <p>{activity.country}</p>
      </section>
    </>
  );
}

const StyledTitle = styled.div`
  margin: 10px 0 0;
  text-align: left;
  overflow-wrap: break-word;
`;

const StyledCategories = styled.div`
  display: flex;
  gap: 5px;
`;
