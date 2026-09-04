import Image from "next/image";
import useSWR from "swr";

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
      {activities.map((activity) => {
        return (
          <div key={activity._id}>
            <Image
              alt="activity"
              width={40}
              height={40}
              src={activity.imageUrl}
            />
            <p>{activity.title}</p>
          </div>
        );
      })}
    </div>
  );
}
