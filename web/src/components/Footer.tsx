import { Separator as BaseSeparator, Box, Button, Flex, Text, Tooltip } from "@still-forest/canopy";
import { SquareArrowOutUpRight } from "lucide-react";
import GithubIcon from "@/assets/github.svg";
import LinkedInIcon from "@/assets/linkedin.svg";
import { Image } from "@/components/Image";
import { Link } from "@/components/Link";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/config";
import { isMobileWebView } from "@/lib/utils";
import { ThemeSelector } from "./ThemeSelector";

const ProjectIcon = ({ link, src, label }: { link: string; src: string; label: string }) => {
  return (
    <Link href={link} noStyle>
      <Button asChild variant="outline">
        <Flex
          align="center"
          className="h-full w-[60px] p-2 opacity-25 hover:cursor-pointer hover:opacity-100"
          justify="center"
        >
          <Image alt={label} height={733} src={src} width={1024} />
        </Flex>
      </Button>
    </Link>
  );
};

const ProjectLinks = () => {
  return (
    <Flex gap="4">
      <Tooltip>
        <Tooltip.Trigger>
          <ProjectIcon label="Abroad logo" link="/abroad" src="/abroad/logo.png" />
        </Tooltip.Trigger>
        <Tooltip.Content>Abroad</Tooltip.Content>
      </Tooltip>
    </Flex>
  );
};

const SocialLinks = () => {
  return (
    <Flex gap="4">
      <Tooltip>
        <Tooltip.Trigger>
          <Link aria-label="Open GitHub profile (opens in a new tab)" href={GITHUB_URL} noStyle>
            <GithubIcon
              aria-hidden="true"
              className="text-primary/60 hover:text-primary"
              focusable="false"
              height={32}
              width={32}
            />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Flex align="center" gap="1">
            GitHub <SquareArrowOutUpRight size={12} strokeWidth={1.5} />
          </Flex>
        </Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>
          <Link aria-label="Open LinkedIn profile (opens in a new tab)" href={LINKEDIN_URL} noStyle>
            <LinkedInIcon
              aria-hidden="true"
              className="text-primary/60 hover:text-primary"
              focusable="false"
              height={32}
              width={32}
            />
          </Link>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Flex align="center" gap="1">
            LinkedIn <SquareArrowOutUpRight size={12} strokeWidth={1.5} />
          </Flex>
        </Tooltip.Content>
      </Tooltip>
    </Flex>
  );
};

const Separator = () => {
  return (
    <Box className="h-10">
      <BaseSeparator orientation="vertical" />
    </Box>
  );
};
export const Footer = () => {
  const webview = isMobileWebView();

  return (
    <Flex align="center" className="md:flex-row" direction="col" gap="4" justify="between">
      <Text family="serif" size="sm" variant="muted">
        © 2025{" "}
        <Link className="hover:underline" href="/">
          Still Forest LLC
        </Link>
      </Text>
      <Flex className="xs:hidden">
        <ProjectLinks />
      </Flex>
      {!webview && (
        <Flex align="center" gap="4">
          <Flex className="hidden xs:flex">
            <ProjectLinks />
            <Separator />
          </Flex>
          <ThemeSelector />
          <Separator />
          <SocialLinks />
        </Flex>
      )}
    </Flex>
  );
};
