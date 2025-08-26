import { Container, Heading, Paragraph } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/Abroad/Header";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { SectionHeading } from "@/components/SectionHeading";
import { contact } from "@/config";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/utils";

export default function Component() {
  const { setTitle } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setTitle("Support");
  }, [setTitle]);

  const webview = isMobileWebView();

  return (
    <Layout className={`${webview ? "mt-8" : ""}`} header={!webview && <Header />}>
      <Container>
        <Heading family="serif" level="1">
          Support
        </Heading>
        <SectionHeading>Contact Us</SectionHeading>
        <Paragraph>
          Please contact us at <Link to={`mailto:${contact.email}`}>{contact.email}</Link>
        </Paragraph>
      </Container>
    </Layout>
  );
}
