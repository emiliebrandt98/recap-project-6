import GlobalStyle from "../styles";
import Layout from "@/components/Layout";
import { SWRConfig } from "swr";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const [isEditing, setIsEditing] = useState(false);

  function handleEdit(boolean) {
    setIsEditing(boolean);
  }

  return (
    <Layout onEdit={handleEdit}>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component isEditing={isEditing} onEdit={handleEdit} {...pageProps} />
      </SWRConfig>
    </Layout>
  );
}
