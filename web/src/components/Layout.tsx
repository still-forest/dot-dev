import { Container, Flex } from "@still-forest/canopy";
import { Footer } from "@/components/Footer";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="col" className="mx-auto h-screen w-full max-w-screen-lg">
      <Container as="main" className="mx-0 flex-1">
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};
