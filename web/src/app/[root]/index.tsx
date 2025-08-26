import { Button, Container, Flex } from "@still-forest/canopy";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { useHead } from "@/hooks/useHead";

export const Root = () => {
  const { setIcon } = useHead({
    baseTitle: "Still Forest",
  });

  useEffect(() => {
    setIcon("/icon-192.png");
  }, [setIcon]);

  return (
    <Layout>
      <Container className="h-full" gap="4" justify="between">
        <Flex.Item className="flex items-center justify-center" flex="auto">
          <img alt="Logo" className="w-xl" src="/logo-full-lg.png" />
        </Flex.Item>
        <Flex.Item className="flex items-center justify-center" flex="auto">
          <Link to="/contact">
            <Button>Get in touch</Button>
          </Link>
        </Flex.Item>
      </Container>
    </Layout>
  );
};
