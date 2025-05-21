import { Container, Flex, Text } from "@still-forest/canopy";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <Container className="h-full">
        <Flex justify="between" direction="col" gap="4" className="h-full">
          <Flex.Item flex="auto" className="flex items-center justify-center">
            <img src="/logo-full-lg.png" alt="Logo" className="max-w-[500px]" />
          </Flex.Item>
          <Flex.Item flex="auto" className="flex items-center justify-center">
            <Text className="text-center">Coming soon.</Text>
          </Flex.Item>
        </Flex>
      </Container>
    </Layout>
  );
}

export default App;
