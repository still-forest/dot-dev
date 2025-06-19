import { Button, Flex, Heading } from "@still-forest/canopy";
import { Link } from "react-router";

export const Header = () => {
  return (
    <Flex
      justify="between"
      align="center"
      gap="4"
      className="mt-2 mb-8 flex-col border-border border-b py-4 sm:flex-row"
    >
      <Link to="/abroad">
        <Flex align="center" gap="2">
          <img src="/abroad/logo.png" alt="Abroad logo" className="w-[48px]" />
          <Heading level="1" className="font-abroad-brand text-abroad-brand">
            Abroad
          </Heading>
        </Flex>
      </Link>
      <Button variant="outline" asChild>
        <Link to="/" className="flex items-center gap-2">
          <Heading level="3" weight="thin" className="font-brand">
            by Still Forest
          </Heading>
          <img src="/icon-192.png" alt="Still Forest logo" className="w-[24px]" />
        </Link>
      </Button>
    </Flex>
  );
};
