import { Button, Container, Flex, Heading } from "@still-forest/canopy";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { useHead } from "@/hooks/useHead";

export default function Component() {
  const { setIcon } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setIcon("/abroad/favicon.png");
  }, [setIcon]);

  return (
    <Layout>
      <Flex align="center" className="h-full" direction="col" gap="12" justify="center">
        <Container>
          <Flex align="center" justify="center">
            <img alt="Abroad logo" className="w-lg" src="/abroad/splash-icon.png" />
          </Flex>
        </Container>
        <Container>
          <Flex align="center" justify="center">
            <Link className="flex items-center gap-2" to="/">
              <Heading className="font-brand" level="3" weight="thin">
                by Still Forest
              </Heading>
              <img alt="Still Forest logo" className="w-[24px]" src="/icon-192.png" />
            </Link>
          </Flex>
        </Container>
        <Container>
          <Flex align="center" gap="2" justify="center">
            <Button asChild variant="outline">
              <Link noStyle to="/abroad/privacy">
                Privacy Policy
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link noStyle to="/abroad/disclosures">
                Disclosures
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link noStyle to="/abroad/support">
                Support
              </Link>
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
