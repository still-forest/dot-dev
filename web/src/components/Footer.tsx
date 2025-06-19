import { Footer as BaseFooter, Box, Button, Flex, Separator, Text, type Theme, Tooltip } from "@still-forest/canopy";
import { MonitorCog, Moon, SquareArrowOutUpRight, Sun } from "lucide-react";
import { Link } from "@/components/Link";
import { GITHUB_URL, LINKEDIN_URL } from "@/config";
import { useTheme } from "@/context/useTheme";
import { ReactComponent as GithubIcon } from "../assets/github.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin.svg";

const ProjectIcon = ({ link, src, label }: { link: string; src: string; label: string }) => {
  return (
    <Link to={link} noStyle>
      <Button variant="outline" asChild>
        <Flex
          align="center"
          justify="center"
          className="h-full w-[60px] p-2 opacity-25 hover:cursor-pointer hover:opacity-100"
        >
          <img src={src} alt={label} />
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
          <ProjectIcon link="/abroad" src="/abroad/logo.png" label="Abroad logo" />
        </Tooltip.Trigger>
        <Tooltip.Content>Abroad</Tooltip.Content>
      </Tooltip>
    </Flex>
  );
};

const ThemeSelection = () => {
  const { theme, setTheme } = useTheme();

  const getClassName = (prospectiveTheme: Theme) => {
    return theme === prospectiveTheme ? "text-primary/75" : "text-primary/25 hover:text-primary";
  };

  return (
    <Flex gap="4">
      <Tooltip>
        <Tooltip.Trigger>
          <MonitorCog size={32} className={getClassName("system")} onClick={() => setTheme("system")} />
        </Tooltip.Trigger>
        <Tooltip.Content>Use system theme</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>
          <Sun size={32} className={getClassName("light")} onClick={() => setTheme("light")} />
        </Tooltip.Trigger>
        <Tooltip.Content>Use light theme</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>
          <Moon size={32} className={getClassName("dark")} onClick={() => setTheme("dark")} />
        </Tooltip.Trigger>
        <Tooltip.Content>Use dark theme</Tooltip.Content>
      </Tooltip>
    </Flex>
  );
};

export const Footer = () => {
  return (
    <BaseFooter className="flex items-center justify-between">
      <Text variant="muted" size="sm">
        © 2025{" "}
        <Link to="/" className="hover:underline">
          Still Forest LLC
        </Link>
        .
      </Text>
      <Flex gap="4" align="center">
        <ProjectLinks />
        <Box className="h-10">
          <Separator orientation="vertical" />
        </Box>
        <ThemeSelection />
        <Box className="h-10">
          <Separator orientation="vertical" />
        </Box>
        <Tooltip>
          <Tooltip.Trigger>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <GithubIcon width={32} height={32} className="text-primary/60 hover:text-primary" />
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Flex align="center" gap="1">
              GitHub <SquareArrowOutUpRight size={12} strokeWidth={1.5} />
            </Flex>
          </Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon width={32} height={32} className="text-primary/60 hover:text-primary" />
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Flex align="center" gap="1">
              LinkedIn <SquareArrowOutUpRight size={12} strokeWidth={1.5} />
            </Flex>
          </Tooltip.Content>
        </Tooltip>
      </Flex>
    </BaseFooter>
  );
};
