"use client";

import { Button, Container, Flex, Heading } from "@still-forest/canopy";
import { useEffect } from "react";
import { HeroImage } from "@/components/HeroImage";
import { Image } from "@/components/Image";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";
import { useHead } from "@/hooks/useHead";

export default function Page() {
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
          <HeroImage alt="Abroad logo" height={733} src="/abroad/splash-icon.png" width={1024} />
        </Container>
        <Container>
          <Flex align="center" justify="center">
            <Link className="flex items-center gap-2" href="/">
              <Heading className="font-brand" level="3" weight="thin">
                by Still Forest
              </Heading>
              <Image alt="Still Forest logo" className="w-[24px]" size={192} src="/icon-192.png" />
            </Link>
          </Flex>
        </Container>
        <Container>
          <Flex align="center" className="xs:flex-row" direction="col" gap="2" justify="center">
            <Button asChild className="w-full xs:w-auto" variant="outline">
              <Link href="/abroad/privacy" noStyle>
                Privacy Policy
              </Link>
            </Button>
            <Button asChild className="w-full xs:w-auto" variant="outline">
              <Link href="/abroad/disclosures" noStyle>
                Disclosures
              </Link>
            </Button>
            <Button asChild className="w-full xs:w-auto" variant="outline">
              <Link href="/abroad/support" noStyle>
                Support
              </Link>
            </Button>
          </Flex>
        </Container>
      </Flex>
    </Layout>
  );
}
