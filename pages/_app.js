import GlobalStyle from "@/styles.js";
import Layout from "@/components/layout/Layout/Layout.js";
import useSWR, { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";

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
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);

  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Layout>
        <Component
          activities={activities}
          error={error}
          isLoading={isLoading}
          {...pageProps}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          theme="light"
          pauseOnHover
        />
      </Layout>
    </SWRConfig>
  );
}
