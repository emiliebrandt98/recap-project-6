import ActivityList from "@/components/ActivityList";

export default function HomePage({ activities, error, isLoading }) {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;
  return (
    <div>
      <ActivityList activities={activities} />
    </div>
  );
}
