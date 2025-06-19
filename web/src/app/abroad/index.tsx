import { Button, Container, Flex, Heading } from "@still-forest/canopy";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { useHead } from "@/hooks/useHead";

export const Abroad = () => {
  const { setIcon } = useHead({
    baseTitle: "Abroad",
  });

  useEffect(() => {
    setIcon("/abroad/favicon.png");
  }, [setIcon]);

  return (
    <Layout>
      <Flex direction="col" align="center" justify="center" gap="12" className="h-full">
        <Container>
          <Flex justify="center" align="center">
            <img src="/abroad/splash-icon.png" alt="Abroad logo" className="w-lg" />
          </Flex>
        </Container>
        <Container>
          <Flex justify="center" align="center">
            <Link to="/" className="flex items-center gap-2">
              <Heading level="3" weight="thin" className="font-brand">
                by Still Forest
              </Heading>
              <img src="/icon-192.png" alt="Still Forest logo" className="w-[24px]" />
            </Link>
          </Flex>
        </Container>
        <Container>
          <Flex justify="center" align="center" gap="2">
            <Button variant="outline" asChild>
              <Link to="/abroad/privacy" noStyle>
                Privacy Policy
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/abroad/disclosures" noStyle>
                Disclosures
              </Link>
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
};
