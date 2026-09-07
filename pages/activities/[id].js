import { useRouter } from "next/router";
import useSWR from "swr";
import LinkTo from "@/components/LinkTo";
import ActivityInfo from "@/components/ActivityInfo";

export default function ActivityDetails() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: activity,
    isLoading,
    error,
  } = useSWR(id ? `/api/activities/${id}` : null);

  if (isLoading) {
    return (
      <>
        <LinkTo pathname={"/"} />
        <p>Loading your page. Just a second.</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <LinkTo pathname={"/"} />
        <p>
          Sorry we couldn't retrieve the activity at the moment. Please try
          again later.
        </p>
      </>
    );
  }

  if (!activity) {
    return null;
  }

  return (
    <main>
      <LinkTo pathname={"/"} />
      <ActivityInfo activity={activity} />
    </main>
  );
}
