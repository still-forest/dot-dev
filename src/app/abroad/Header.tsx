import { Button, Flex, Heading } from "@still-forest/canopy";
import Image from "next/image";
import { Link } from "@/components/Link";

export const Header = () => {
  return (
    <Flex align="center" className="border-border border-b py-4 sm:flex-row" direction="col" gap="4" justify="between">
      <Link href="/abroad">
        <Flex align="center" gap="2">
          <Image alt="Abroad logo" className="w-[48px]" height={733} src="/abroad/logo.png" width={1024} />
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
          <Image alt="Still Forest logo" className="w-[24px]" height={192} src="/icon-192.png" width={192} />
        </Link>
      </Button>
    </Flex>
  );
};
