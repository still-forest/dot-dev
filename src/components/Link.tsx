import NextLink from "next/link";

interface LinkProps extends React.ComponentProps<typeof NextLink> {
  noStyle?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Link = ({ children, href, className, noStyle, ...props }: LinkProps) => {
  const classNames = noStyle ? className : [className, "hover:underline"].filter(Boolean).join(" ");

  const external = typeof href === "string" && href.startsWith("http");

  if (external) {
    return (
      <a className={classNames} href={href} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink className={classNames} href={href} {...props}>
      {children}
    </NextLink>
  );
};
