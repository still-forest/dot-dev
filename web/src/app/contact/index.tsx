import { Container } from "@still-forest/canopy";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";

export default function Component() {
  return (
    <Layout>
      <Header title="Contact us" />
      <Container>
        <ContactForm />
      </Container>
    </Layout>
  );
}
