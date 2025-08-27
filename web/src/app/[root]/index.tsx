import { Button, Container, Flex } from "@still-forest/canopy";
import { useEffect } from "react";
import { HeroImage } from "@/components/HeroImage";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
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
      <Flex align="center" className="h-full sm:justify-center" direction="col" gap="12" justify="start">
        <Container>
          <HeroImage alt="Still Forest logo" src="/logo-full-lg.png" />
        </Container>
        <Container align="center" justify="center">
          <Button asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </Container>
      </Flex>
    </Layout>
  );
}
