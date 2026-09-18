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
      <Dates activity={activity} />
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

      <Notes />
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
