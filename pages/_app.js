import GlobalStyle from "@/styles.js";
import Layout from "@/components/layout/Layout/Layout.js";
import useSWR, { SWRConfig } from "swr";
import { ToastContainer } from "react-toastify";
import useLocalStorageState from "use-local-storage-state";

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
  const [isFavorite, setIsFavorite] = useLocalStorageState("Favorites", {
    defaultValue: [],
  });
  const {
    data: activities,
    error,
    isLoading,
  } = useSWR("/api/activities", fetcher);

  function handleFavorites(id) {
    if (isFavorite.includes(id)) {
      const filteredFavorites = isFavorite.filter((favId) => favId !== id);
      setIsFavorite(filteredFavorites);
    } else {
      setIsFavorite([...isFavorite, id]);
    }
  }

  console.log(isFavorite);

  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Layout>
        <Component
          activities={activities}
          error={error}
          isLoading={isLoading}
          isFavorite={isFavorite}
          onToggle={handleFavorites}
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
