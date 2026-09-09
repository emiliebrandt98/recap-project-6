import GlobalStyle from "@/styles.js";
import Layout from "@/components/layout/Layout/Layout.js";
import useSWR, { SWRConfig } from "swr";
import { useState } from "react";

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
          {...pageProps}
        />
      </Layout>
    </SWRConfig>
  );
}
