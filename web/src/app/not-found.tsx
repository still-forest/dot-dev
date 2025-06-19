import { PageNotFound } from "@still-forest/canopy";
import { useNavigate } from "react-router";
import { Layout } from "@/components/Layout";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <PageNotFound goHome={() => navigate("/")} />
    </Layout>
  );
};
