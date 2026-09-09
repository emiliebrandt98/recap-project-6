import ActivityList from "@/components/ActivityList";
import { PrimaryButton } from "@/components/Button/Button";

export default function HomePage({ activities, error, isLoading }) {
  if (isLoading) return <p>Loading...</p>;
  if (error)
    return (
      <div>
        <p>Error fetching data.</p>
        <PrimaryButton
          type="button"
          buttonText={"Try again"}
          onClick={() => mutate()}
        />
      </div>
    );

  return (
    <div>
      <ActivityList activities={activities} />
    </div>
  );
}
