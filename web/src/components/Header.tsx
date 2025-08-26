import { Button, Container, Flex, Heading } from "@still-forest/canopy";
import { Link } from "react-router";

interface HeaderProps {
  title?: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <Container className="border-b border-border mb-8">
      <Flex justify="between">
        {title && (
          <Heading family="serif" level="1">
            {title}
          </Heading>
        )}
        <Button asChild variant="ghost">
          <Link className="flex items-center gap-2" to="/">
            <Heading className="font-brand" level="2" weight="thin">
              Still Forest
            </Heading>
            <img alt="Still Forest logo" className="w-[32px]" src="/icon-192.png" />
          </Link>
        </Button>
      </Flex>
    </Container>
  );
};
