import { Container, Heading, Separator } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/Abroad/Header";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import { Layout } from "@/components/Layout";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/lib/utils";

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
        <Separator className="my-8" />
        <ContactForm returnTo="/abroad" />
      </Container>
    </Layout>
  );
}
