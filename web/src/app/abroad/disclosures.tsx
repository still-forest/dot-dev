import { Heading, Separator, Text } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/Abroad/Header";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { Paragraph } from "@/components/Paragraph";
import { contact } from "@/config";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/utils";

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading level="3" family="serif" variant="muted" weight="light" className="mt-4">
      {children}
    </Heading>
  );
};

export const DisclosuresPage = () => {
  const { setTitle } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setTitle("Disclosures");
  }, [setTitle]);

  const webview = isMobileWebView();

  return (
    <Layout>
      {!webview && <Header />}
      <Heading level="1">Disclosures</Heading>
      <Text color="muted" className="mb-4 italic">
        Effective date: 2025-06-19
      </Text>
      <Paragraph>This page contains important disclosures about our application ("App" or "app").</Paragraph>

      <Separator className="my-4" />

      <SectionHeading>Images</SectionHeading>
      <Paragraph>
        Images are sourced from <Link to="https://unsplash.com/">Unsplash</Link> and are not owned by Still Forest. We
        do not claim ownership of the images.
      </Paragraph>
      <Paragraph>
        Images are used in accordance with the <Link to="https://unsplash.com/terms">Unsplash Terms & Conditions</Link>{" "}
        and the <Link to="https://unsplash.com/license">Unsplash License</Link>.
      </Paragraph>
      <Paragraph>
        While usage accreditation is not required under the Unsplash License, we do so as a courtesy. If you are the
        copyright owner of an image and would like it removed, please contact us at{" "}
        <Link to={`mailto:${contact.email}`}>{contact.email}</Link> and we will remove it as soon as reasonably
        possible.
      </Paragraph>

      <Separator className="my-4" />

      <SectionHeading>Contact</SectionHeading>
      <Paragraph>
        If you have any questions or concerns, please contact us at{" "}
        <Link to={`mailto:${contact.email}`}>{contact.email}</Link>.
      </Paragraph>
    </Layout>
  );
};
