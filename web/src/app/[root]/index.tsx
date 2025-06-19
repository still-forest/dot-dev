import { Container, Flex } from "@still-forest/canopy";
import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";

export const Root = () => {
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
