"use client";

import { Container } from "@still-forest/canopy/next";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";

export default function Page() {
  return (
    <Layout>
      <Header title="Contact us" />
      <Container>
        <ContactForm />
      </Container>
    </Layout>
  );
}
