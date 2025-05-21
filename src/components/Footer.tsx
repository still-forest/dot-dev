import { Footer as BaseFooter, Flex, Separator, Text } from "@still-forest/canopy";
import { GITHUB_URL, LINKEDIN_URL } from "@/config";
import { ReactComponent as GithubIcon } from "../assets/github.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin.svg";

export const Footer = () => {
  return (
    <BaseFooter className="flex items-center justify-between">
      <Text variant="muted" size="sm">
        © 2025 Still Forest LLC.
      </Text>
      <Flex gap="4">
        <Separator orientation="vertical" />
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <GithubIcon width={32} height={32} className="text-primary/60 hover:text-primary" />
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
          <LinkedInIcon width={32} height={32} className="text-primary/60 hover:text-primary" />
        </a>
      </Flex>
    </BaseFooter>
  );
};
