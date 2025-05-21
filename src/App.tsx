import { Container, Text } from "@still-forest/canopy";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Container>
        <img src="/logo-full-lg.png" alt="Logo" />
      </Container>
      <Container className="text-center">
        <Text>We're still working on this site.</Text>
      </Container>
    </Layout>
  );
}

export default App;
