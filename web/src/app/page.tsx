import { Button, Container, Flex } from "@still-forest/canopy/next";
import { HeroImage } from "@/components/HeroImage";
import { Layout } from "@/components/Layout";
import { Link } from "@/components/Link";

export default function Page() {
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
