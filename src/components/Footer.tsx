import { Footer as BaseFooter, Box, Flex, Separator, Text, type Theme, Tooltip } from "@still-forest/canopy";
import { MonitorCog, Moon, SquareArrowOutUpRight, Sun } from "lucide-react";
import GithubIcon from "@/assets/github.svg";
import LinkedInIcon from "@/assets/linkedin.svg";
import { GITHUB_URL, LINKEDIN_URL } from "@/config";
import { useTheme } from "@/context/useTheme";

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
        © 2025 Still Forest LLC.
      </Text>
      <Flex gap="4" align="center">
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
