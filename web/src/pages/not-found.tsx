import { PageNotFound } from "@still-forest/canopy";
import { useNavigate } from "react-router";
import { Layout } from "@/components/Layout";

export default function Component() {
  const navigate = useNavigate();

  return (
    <Layout>
      <PageNotFound goHome={() => navigate("/")} />
    </Layout>
  );
}
