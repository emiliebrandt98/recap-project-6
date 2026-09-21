import Image from "next/image";
import styled from "styled-components";
import HeartButton from "@/components/ui/HeartButton/HeartButton";
import Notes from "@/components/features/Notes/Notes";
import Dates from "@/components/Dates/Dates";
import dynamic from "next/dynamic";
import useSWR from "swr";

const LocationMap = dynamic(
  () => import("@/components/features/LocationMap/LocationMap.js"),
  {
    ssr: false,
  }
);

export default function ActivityInfo({ activity }) {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const weatherUrl =
    activity.latitude && activity.longitude && apiKey
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${activity.latitude}&lon=${activity.longitude}&appid=${apiKey}&units=metric&lang=en`
      : null;

  const {
    data: weatherData,
    error: weatherError,
    isLoading: weatherLoading,
  } = useSWR(weatherUrl);

  if (!activity) return null;

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

        <WeatherContainer>
          <h3>Current Weather</h3>
          {weatherLoading && <p>Loading weather...</p>}
          {weatherError && <p>Could not load weather data.</p>}
          {weatherData && weatherData.main && (
            <WeatherInfo>
              <WeatherTemp>{Math.round(weatherData.main.temp)}°C</WeatherTemp>
              <WeatherDescription>
                {weatherData.weather[0].description}
              </WeatherDescription>
            </WeatherInfo>
          )}
        </WeatherContainer>
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

const WeatherContainer = styled.div`
  background-color: var(--color-grey-light);
  padding: var(--padding-l);
  border-radius: var(--border-radius-m);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-m);
`;

const WeatherInfo = styled.div`
  display: flex;
  align-items: flex-end;
  gap: var(--spacing-m);
`;

const WeatherTemp = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
`;

const WeatherDescription = styled.span`
  text-transform: capitalize;
  color: var(--font-text-dark);
`;
