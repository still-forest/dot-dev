import { Container, Flex } from "@still-forest/canopy";
import { useEffect } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { useHead } from "@/hooks/useHead";

export default function Component() {
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
          <ContactForm />
        </Flex.Item>
      </Container>
    </Layout>
  );
}
