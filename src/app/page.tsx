"use client";

import { Container, Flex } from "@still-forest/canopy";
import Image from "next/image";
import { useEffect } from "react";
import { ContactForm } from "@/components/ContactForm";
import { Layout } from "@/components/Layout";
import { useHead } from "@/hooks/useHead";

export default function Page() {
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
          <Image alt="Logo" className="w-xl" height={2071} src="/logo-full-lg.png" width={1910} />
        </Flex.Item>
        <Flex.Item className="flex items-center justify-center" flex="auto">
          <ContactForm />
        </Flex.Item>
      </Container>
    </Layout>
  );
}
