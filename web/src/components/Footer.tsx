import { Box, Button, Flex, Separator, Text, type Theme, Tooltip } from "@still-forest/canopy";
import { MonitorCog, Moon, SquareArrowOutUpRight, Sun } from "lucide-react";
import { Link } from "@/components/Link";
import { GITHUB_URL, LINKEDIN_URL } from "@/config";
import { useTheme } from "@/context/useTheme";
import { isMobileWebView } from "@/utils";
import { ReactComponent as GithubIcon } from "../assets/github.svg";
import { ReactComponent as LinkedInIcon } from "../assets/linkedin.svg";

const ProjectIcon = ({ link, src, label }: { link: string; src: string; label: string }) => {
  return (
    <Link noStyle to={link}>
      <Button asChild variant="outline">
        <Flex
          align="center"
          className="h-full w-[60px] p-2 opacity-25 hover:cursor-pointer hover:opacity-100"
          justify="center"
        >
          <img alt={label} src={src} />
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

const ThemeSelection = () => {
  const { theme, setTheme } = useTheme();

  const getClassName = (prospectiveTheme: Theme) => {
    return theme === prospectiveTheme ? "text-primary/75" : "text-primary/25 hover:text-primary";
  };

  return (
    <Flex gap="4">
      <Tooltip>
        <Tooltip.Trigger>
          <MonitorCog className={getClassName("system")} onClick={() => setTheme("system")} size={32} />
        </Tooltip.Trigger>
        <Tooltip.Content>Use system theme</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>
          <Sun className={getClassName("light")} onClick={() => setTheme("light")} size={32} />
        </Tooltip.Trigger>
        <Tooltip.Content>Use light theme</Tooltip.Content>
      </Tooltip>
      <Tooltip>
        <Tooltip.Trigger>
          <Moon className={getClassName("dark")} onClick={() => setTheme("dark")} size={32} />
        </Tooltip.Trigger>
        <Tooltip.Content>Use dark theme</Tooltip.Content>
      </Tooltip>
    </Flex>
  );
};

export const Footer = () => {
  const webview = isMobileWebView();

  return (
    <Flex align="center" className="md:flex-row" gap="4" justify="between">
      <Text family="serif" size="sm" variant="muted">
        © 2025{" "}
        <Link className="hover:underline" to="/">
          Still Forest LLC
        </Link>
      </Text>
      {!webview && (
        <Flex align="center" gap="4">
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
              <a href={GITHUB_URL} rel="noopener noreferrer" target="_blank">
                <GithubIcon className="text-primary/60 hover:text-primary" height={32} width={32} />
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
              <a href={LINKEDIN_URL} rel="noopener noreferrer" target="_blank">
                <LinkedInIcon className="text-primary/60 hover:text-primary" height={32} width={32} />
              </a>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <Flex align="center" gap="1">
                LinkedIn <SquareArrowOutUpRight size={12} strokeWidth={1.5} />
              </Flex>
            </Tooltip.Content>
          </Tooltip>
        </Flex>
      )}
    </Flex>
  );
};
