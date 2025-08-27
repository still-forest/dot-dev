import { Button, Container, Flex, Heading } from "@still-forest/canopy";
import { Link } from "react-router";

interface HeaderProps {
  title?: string;
}

const BrandButton = () => {
  return (
    <Button asChild variant="unstyled">
      <Link className="flex items-center gap-2" to="/">
        <Heading className="font-brand" level="2" weight="thin">
          Still Forest
        </Heading>
        <img alt="Still Forest logo" className="w-[32px]" src="/icon-192.png" />
      </Link>
    </Button>
  );
};

export const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <Flex className="sm:hidden bg-primary/10 px-4 py-2 mb-4 border-b border-border">
        <BrandButton />
      </Flex>
      <Container className="border-b border-border mb-8">
        <Flex gap="4" justify="between">
          {title && (
            <Heading family="serif" level="1">
              {title}
            </Heading>
          )}
          <Flex.Item className="hidden sm:flex">
            <BrandButton />
          </Flex.Item>
        </Flex>
      </Container>
    </>
  );
};
