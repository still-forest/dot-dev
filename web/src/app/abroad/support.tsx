import { Container, Heading } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/Abroad/Header";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Layout } from "@/components/Layout";
import { SectionHeading } from "@/components/SectionHeading";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/utils";

export default function Page() {
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
        <ContactForm />
      </Container>
    </Layout>
  );
}
