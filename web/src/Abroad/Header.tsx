import { Button, Flex, Heading } from "@still-forest/canopy";
import { Link } from "react-router";

export const Header = () => {
  return (
    <Flex align="center" className="border-border border-b py-4 sm:flex-row" direction="col" gap="4" justify="between">
      <Link to="/abroad">
        <Flex align="center" gap="2">
          <img alt="Abroad logo" className="w-[48px]" src="/abroad/logo.png" />
          <Heading className="font-abroad-brand text-abroad-brand" level="1">
            Abroad
          </Heading>
        </Flex>
      </Link>
      <Button asChild variant="outline">
        <Link className="flex items-center gap-2" to="/">
          <Heading className="font-brand" level="3" weight="thin">
            by Still Forest
          </Heading>
          <img alt="Still Forest logo" className="w-[24px]" src="/icon-192.png" />
        </Link>
      </Button>
    </Flex>
  );
};
