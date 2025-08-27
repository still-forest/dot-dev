import { Container, Heading, Paragraph, Separator, Text } from "@still-forest/canopy";
import { useEffect } from "react";
import { Header } from "@/Abroad/Header";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { SectionHeading } from "@/components/SectionHeading";
import { useHead } from "@/hooks/useHead";
import { isMobileWebView } from "@/utils";

export default function Page() {
  const { setTitle } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setTitle("Privacy Policy");
  }, [setTitle]);

  const webview = isMobileWebView();

  return (
    <Layout className={`${webview ? "mt-8" : ""}`} header={!webview && <Header />}>
      <Container>
        <Heading family="serif" level="1">
          Privacy Policy
        </Heading>
        <Text className="mb-4 italic" color="muted" family="serif">
          Effective date: 2025-06-19
        </Text>
        <Paragraph>
          This Privacy Policy explains how your information is handled when you use our application ("App" or "app").
        </Paragraph>

        <Separator className="my-4" />

        <SectionHeading>Information We Do Not Collect</SectionHeading>
        <Paragraph>
          We <strong>do not collect, store, or share any personally identifiable information (PII)</strong> such as your
          name, email address, or phone number.
        </Paragraph>

        <SectionHeading>Information We Collect</SectionHeading>
        <Paragraph as="div">
          We may collect anonymous usage data to understand how the app is used and improve your experience. This
          includes:
          <ul className="mt-2 list-disc pl-8">
            <li>Selected options or features within the app</li>
            <li>Device type and OS version</li>
            <li>General app usage patterns</li>
          </ul>
        </Paragraph>

        <SectionHeading>How We Use This Information</SectionHeading>
        <Paragraph as="div">
          We use this data solely to:
          <ul className="mt-2 list-disc pl-8">
            <li>Understand how users interact with the app</li>
            <li>Improve functionality and usability</li>
            <li>Identify and fix bugs or performance issues</li>
          </ul>
        </Paragraph>
        <Paragraph>
          This information is not used to identify you personally, and we do not attempt to link it to your identity.
        </Paragraph>

        <SectionHeading>Third-Party Services</SectionHeading>
        <Paragraph as="div">
          We use the following third-party services that may process data on our behalf:
          <ul className="mt-2 list-disc pl-8">
            <li>
              <strong>Expo</strong>: We use Expo for app development and delivery. Expo may collect device information
              (such as device type, OS version) to provide build and update services. See Expo's privacy policy for
              details: <Link href="https://expo.dev/privacy">https://expo.dev/privacy</Link>
            </li>
            <li>
              <strong>Sentry</strong>: We use Sentry for error tracking and crash reporting. Sentry may collect
              non-personal diagnostic data (such as error logs and device context) to help us fix bugs and improve
              stability. No personal data is collected. See Sentry's privacy policy for details:{" "}
              <Link href="https://sentry.io/privacy/">https://sentry.io/privacy/</Link>
            </li>
            <li>
              <strong>PostHog</strong>: We use PostHog to collect anonymized analytics about how users interact with the
              app. PostHog does not collect personally identifiable information. See PostHog's privacy policy for
              details: <Link href="https://posthog.com/privacy">https://posthog.com/privacy</Link>
            </li>
          </ul>
        </Paragraph>

        <SectionHeading>Children's Privacy</SectionHeading>
        <Paragraph>
          This App does not knowingly collect or solicit any personal information from anyone under the age of 13. If
          you believe that a child under 13 has provided personal information to us, please contact us so we can delete
          it.
        </Paragraph>

        <SectionHeading>Changes to This Privacy Policy</SectionHeading>
        <Paragraph>
          We may update this Privacy Policy from time to time. If we make material changes, we will update the effective
          date at the top and notify users where appropriate.
        </Paragraph>

        <SectionHeading>Contact Us</SectionHeading>
        <Paragraph>
          If you have any questions about this Privacy Policy, please <Link href="/abroad/support">contact us</Link>.
        </Paragraph>
      </Container>
    </Layout>
  );
}
