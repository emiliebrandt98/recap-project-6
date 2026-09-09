import GlobalStyle from "@/styles.js";
import Layout from "@/components/layout/Layout/Layout.js";
import useSWR, { SWRConfig } from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

const fetcher = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await response.json();
    error.status = response.status;
    throw error;
  }

  return response.json();
};

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: activities,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/activities", fetcher);

  function handleEdit(boolean) {
    setIsEditing(boolean);
  }

  function handleCloseToast() {
    // Remove the parameter from the URL when the toast disappears
    router.replace("/", undefined, { shallow: true });
  }

  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Layout>
        <Component
          activities={activities}
          error={error}
          isLoading={isLoading}
          mutate={mutate}
          isEditing={isEditing}
          onEdit={handleEdit}
          onCloseToast={handleCloseToast}
          {...pageProps}
        />
      </Layout>
    </SWRConfig>
  );
}
