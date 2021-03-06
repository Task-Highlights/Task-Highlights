import { Layout } from "../components/layout/index";
import { SEO_component } from "../components/seo";
import { TasksCard } from "../components/tasks/TasksCard";

export default function App(): JSX.Element {
  return (
    <Layout>
      <SEO_component
        title="Daily Tasks"
        description="Your tasks for the day"
        openGraph={{
          title: "Daily Tasks"
        }}
        twitter={{
          cardType: "app"
        }}
      />

      <div className="flex-1 text-center mt-5 z-0">
        <TasksCard />
      </div>
    </Layout>
  );
}
