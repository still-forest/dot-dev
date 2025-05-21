import { Container, Flex, Footer, Text } from "@still-forest/canopy";
import { ReactComponent as GithubIcon } from "../assets/github-mark.svg";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="col" className="mx-auto h-screen w-full max-w-screen-lg">
      <Container as="main" className="mx-0 flex-1">
        {children}
      </Container>
      <Footer className="flex items-center justify-between">
        <Text variant="muted" size="sm">
          © 2025 Still Forest LLC.
        </Text>
        <Flex>
          <a
            href="https://github.com/still-forest"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon width={32} height={32} className="text-primary" />
          </a>
        </Flex>
      </Footer>
    </Flex>
  );
}
