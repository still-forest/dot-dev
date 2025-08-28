import NextLink from "next/link";

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  noStyle?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Link = ({ children, href, className, noStyle, rel, target, ...props }: LinkProps) => {
  const classNames = noStyle ? className : [className, "hover:underline"].filter(Boolean).join(" ");
  const isExternal =
    typeof href === "string" &&
    !href.startsWith("/") &&
    !href.startsWith("#") &&
    !href.startsWith("?") &&
    !href.startsWith("mailto:") &&
    !href.startsWith("tel:");
  const safeRel = isExternal ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ") : rel;
  const tabTarget = isExternal ? (target ?? "_blank") : target;
  if (isExternal) {
    return (
      <NextLink className={classNames} href={href} rel={safeRel} target={tabTarget} {...props}>
        {children}
      </NextLink>
    );
  }
  return (
    <NextLink className={classNames} href={href} {...props}>
      {children}
    </NextLink>
  );
};
