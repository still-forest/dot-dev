import { Container, Flex } from "@still-forest/canopy";
import { useEffect } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
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
      <Container className="h-full">
        <Flex justify="between" direction="col" gap="4" className="h-full">
          <Flex.Item flex="auto" className="flex items-center justify-center">
            <img src="/logo-full-lg.png" alt="Logo" className="w-xl" />
          </Flex.Item>
          <Flex.Item flex="auto" className="flex items-center justify-center">
            <ContactForm />
          </Flex.Item>
        </Flex>
      </Container>
    </Layout>
  );
};
