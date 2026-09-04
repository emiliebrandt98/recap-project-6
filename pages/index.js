import ActivityList from "@/components/ActivityList";
import ButtonToCreateActivity from "@/components/Navbar";
import Layout from "@/components/Layout";

export default function HomePage() {
  return (
    <div>
      <Layout>
        <ActivityList />
      </Layout>
    </div>
  );
}
