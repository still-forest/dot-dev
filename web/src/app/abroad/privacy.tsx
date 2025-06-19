import { Container, Heading, Separator, Text } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/Abroad/Header";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { contact } from "@/config";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/utils";

const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading level="3" family="serif" className="mt-4">
      {children}
    </Heading>
  );
};

export const PrivacyPage = () => {
  const { setTitle } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setTitle("Privacy Policy");
  }, [setTitle]);

  const webview = isMobileWebView();

  return (
    <Layout>
      {!webview && <Header />}
      <Heading level="1">Privacy Policy</Heading>
      <Text color="muted" className="mb-4 italic">
        Effective date: 2025-06-10
      </Text>
      <Text>
        This Privacy Policy explains how your information is handled when you use our mobile application (“App”).
      </Text>

      <Separator className="my-4" />

      <SectionHeading>Information We Do Not Collect</SectionHeading>
      <Text>
        We do not collect, store, or share any personally identifiable information (PII) from users of this App.
      </Text>

      <SectionHeading>Third-Party Services</SectionHeading>
      <Text>
        While we do not collect personal information ourselves, the App integrates third-party services which may
        process limited technical or diagnostic information to improve app performance:
      </Text>
      <Container>
        <Heading level="4">Expo</Heading>
        <Text>
          We use Expo for app development and delivery. Expo may collect device information (such as device type, OS
          version) to provide build and update services. See Expo's privacy policy for details:{" "}
          <Link to="https://expo.dev/privacy">https://expo.dev/privacy</Link>
        </Text>
        <Heading level="4">Sentry</Heading>
        <Text>
          We use Sentry for error tracking and crash reporting. Sentry may collect non-personal diagnostic data (such as
          error logs and device context) to help us fix bugs and improve stability. No personal data is collected. See
          Sentry's privacy policy for details: <Link to="https://sentry.io/privacy/">https://sentry.io/privacy/</Link>
        </Text>
      </Container>

      <SectionHeading>Children's Privacy</SectionHeading>
      <Text>
        This App does not knowingly collect or solicit any personal information from anyone under the age of 13. If you
        believe that a child under 13 has provided personal information to us, please contact us so we can delete it.
      </Text>

      <SectionHeading>Changes to This Privacy Policy</SectionHeading>
      <Text>
        We may update this Privacy Policy from time to time. If we make material changes, we will update the effective
        date at the top and notify users where appropriate.
      </Text>

      <SectionHeading>Contact Us</SectionHeading>
      <Text>
        If you have any questions about this Privacy Policy, please contact us at:{" "}
        <Link to={`mailto:${contact.email}`}>{contact.email}</Link>
      </Text>
    </Layout>
  );
};
