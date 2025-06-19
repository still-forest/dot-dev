import { Button, Container, Flex } from "@still-forest/canopy";
import { Link } from "react-router";
import { Layout } from "@/components/Layout";

export const Abroad = () => {
  return (
    <Layout>
      <Flex direction="col" align="center" justify="center" gap="12" className="h-full">
        <Container>
          <Flex justify="center" align="center">
            <img src="/abroad/splash-icon.png" alt="Abroad logo" className="w-lg" />
          </Flex>
        </Container>
        <Container>
          <Flex justify="center" align="center">
            <Button variant="outline" asChild>
              <Link to="/abroad/privacy">Privacy Policy</Link>
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
};
