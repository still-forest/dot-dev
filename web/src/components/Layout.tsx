import { Container, Flex } from "@still-forest/canopy";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  return (
    <Flex direction="col" className={`mx-auto h-screen w-full max-w-screen-lg ${className}`}>
      <Container as="main" className="mx-0 flex-1">
        {children}
      </Container>
      <Footer />
    </Flex>
  );
};
