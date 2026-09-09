import useSWR from "swr";
import { useRouter } from "next/router";

export function useActivity() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error, isLoading } = useSWR(
    router.isReady && id ? `/api/activities/${id}` : null
  );

  return {
    activity: data,
    isLoading: isLoading,
    error,
  };
}
