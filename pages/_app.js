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
  const {
    data: activities,
    error,
    isLoading,
    mutate,
  } = useSWR("/api/activities", fetcher);

  // Remove the parameter from the URL when the toast disappears
  // asPath includes the query string, so we strip everything after "?"
  function handleCloseToast() {
    const cleanPathname = router.asPath.split("?")[0];
    router.replace(cleanPathname, undefined, { shallow: true });
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
          onCloseToast={handleCloseToast}
          {...pageProps}
        />
      </Layout>
    </SWRConfig>
  );
}
