import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import { useState } from "react";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);

  function handleEdit(boolean) {
    setIsEditing(boolean);
  }

  return (
    <Layout onEdit={handleEdit}>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          activities={activities}
          error={error}
          isLoading={isLoading}
          isEditing={isEditing}
          onEdit={handleEdit}
          {...pageProps}
        />
      </SWRConfig>
    </Layout>
  );
}
