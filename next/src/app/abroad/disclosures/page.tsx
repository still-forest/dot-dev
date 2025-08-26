"use client";

import { Container, Heading, Paragraph, Separator, Text } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/app/abroad/Header";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { contact } from "@/config";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/utils";

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading className="mt-4" family="serif" level="3" variant="muted" weight="light">
      {children}
    </Heading>
  );
};

export default function Page() {
  const { setTitle } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setTitle("Disclosures");
  }, [setTitle]);

  const webview = isMobileWebView();

  return (
    <Layout className={`${webview ? "mt-8" : ""}`} header={!webview && <Header />}>
      <Container>
        <Heading family="serif" level="1">
          Disclosures
        </Heading>
        <Text className="mb-4 italic" color="muted" family="serif">
          Effective date: 2025-06-19
        </Text>
        <Paragraph>This page contains important disclosures about our application ("App" or "app").</Paragraph>

        <Separator className="my-4" />

        <SectionHeading>Background Images</SectionHeading>
        <Paragraph>
          Background images are sourced from <Link href="https://unsplash.com/">Unsplash</Link> and are not owned by
          Still Forest. We do not claim ownership of the images.
        </Paragraph>
        <Paragraph>
          Images are used in accordance with the{" "}
          <Link href="https://unsplash.com/terms">Unsplash Terms & Conditions</Link> and the{" "}
          <Link href="https://unsplash.com/license">Unsplash License</Link>.
        </Paragraph>
        <Paragraph>
          While usage accreditation is not required under the Unsplash License, we do so as a courtesy. If you are the
          copyright owner of an image and would like it removed, please contact us at{" "}
          <Link href={`mailto:${contact.email}`}>{contact.email}</Link> and we will remove it as soon as reasonably
          possible.
        </Paragraph>

        <Separator className="my-4" />

        <SectionHeading>Contact</SectionHeading>
        <Paragraph>
          If you have any questions or concerns, please contact us at{" "}
          <Link href={`mailto:${contact.email}`}>{contact.email}</Link>.
        </Paragraph>
      </Container>
    </Layout>
  );
}
