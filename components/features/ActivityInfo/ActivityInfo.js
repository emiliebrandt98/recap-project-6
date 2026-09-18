import Image from "next/image";
import styled from "styled-components";
import HeartButton from "@/components/ui/HeartButton/HeartButton";
import Notes from "@/components/features/Notes/Notes";
import Dates from "@/components/Dates/Dates";
import dynamic from "next/dynamic";
import ReactWeather, { useOpenWeather } from "react-open-weather";

const LocationMap = dynamic(
  () => import("@/components/features/LocationMap/LocationMap.js"),
  {
    ssr: false,
  }
);

export default function ActivityInfo({ activity }) {
  if (!activity) return null;

  // const { data, isLoading, errorMessage } = useOpenWeather({
  //   key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  //   lat: activity.latitude,
  //   lon: activity.longitude,
  //   lang: "en",
  //   unit: "metric",
  // });

  // if (isLoading) return <p>Loading weather...</p>;
  // if (errorMessage) return <p>Error: {errorMessage}</p>;

  return (
    <>
      <HeaderTextWrapper>
        <ImageContainer>
          <StyledImage
            alt={activity.title || "Activity Image"}
            width={100}
            height={100}
            src={activity.imageUrl}
            priority
          />
          <HeartButton activity={activity} />
        </ImageContainer>

        <HeaderText>
          <Dates activity={activity} />
          <h1>{activity.title}</h1>
        </HeaderText>

        <CategoriesWrapper>
          {activity?.categories?.map((category) => {
            return (
              <StyledCategory key={category._id}>
                {category.name}
              </StyledCategory>
            );
          })}
        </CategoriesWrapper>
      </HeaderTextWrapper>

      <StyledDescription>{activity.description}</StyledDescription>

      <LocationWrapper>
        <h2>Location</h2>
        <p>
          {activity.area}, {activity.country}
        </p>

        <LocationMap
          latitude={activity.latitude}
          longitude={activity.longitude}
          area={activity.area}
          country={activity.country}
        />

        {/* <ReactWeather
        isLoading={isLoading}
        errorMessage={errorMessage}
        data={data}
        lang="en"
        locationLabel={activity.area}
        unitsLabels={{ temperature: "C", windSpeed: "Km/h" }}
        showForecast
      /> */}
      </LocationWrapper>

      <NoteWrapper>
        <h2>Note</h2>
        <Notes />
      </NoteWrapper>
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

const HeaderTextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-ml);
`;

const HeaderText = styled.div`
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

const StyledCategory = styled.span`
  background-color: var(--color-accent);
  font-size: 0.75rem;
  padding: var(--padding-m) var(--padding-ml);
  border-radius: var(--border-radius-l);
`;

const StyledDescription = styled.p`
  line-height: 1.5;
  overflow-wrap: break-word;
`;

const LocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
`;

const NoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-s);
`;
