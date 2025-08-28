import { Button, Flex, Heading } from "@still-forest/canopy";
import { Link } from "@/components/Link";
import { BrandIcon } from "../BrandIcon";
import { AbroadLogo } from "./AbroadLogo";

export const Header = () => {
  return (
    <Flex align="center" className="border-border border-b py-4 sm:flex-row" direction="col" gap="4" justify="between">
      <Link href="/abroad">
        <Flex align="center" gap="2">
          <AbroadLogo className="w-[48px]" />
          <Heading className="font-abroad-brand text-abroad-brand" level="1">
            Abroad
          </Heading>
        </Flex>
      </Link>
      <Button asChild variant="outline">
        <Link className="flex items-center gap-2" href="/">
          <Heading className="font-brand" level="3" weight="thin">
            by Still Forest
          </Heading>
          <BrandIcon className="w-[24px]" />
        </Link>
      </Button>
    </Flex>
  );
};
