import { Container, Flex, Footer, Text } from "@still-forest/canopy";
import { GITHUB_URL, LINKEDIN_URL } from "@/config";
import { ReactComponent as GithubIcon } from "../assets/github.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin.svg";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex direction="col" className="mx-auto h-screen w-full max-w-screen-lg">
      <Container as="main" className="mx-0 flex-1">
        {children}
      </Container>
      <Footer className="flex items-center justify-between">
        <Text variant="muted" size="sm">
          © 2025 Still Forest LLC.
        </Text>
        <Flex gap="4">
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <GithubIcon
              width={32}
              height={32}
              className="text-primary/60 hover:text-primary"
            />
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
            <LinkedInIcon
              width={32}
              height={32}
              className="text-primary/60 hover:text-primary"
            />
          </a>
        </Flex>
      </Footer>
    </Flex>
  );
};
