import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router";

interface LinkProps extends Omit<RouterLinkProps, "to"> {
  href: string;
  noStyle?: boolean;
  className?: string;
}

export const Link = ({ children, href, className, noStyle, ...props }: LinkProps) => {
  const classNames = noStyle ? className : [className, "hover:underline"].filter(Boolean).join(" ");

  const external = href.startsWith("http");

  if (external) {
    return (
      <RouterLink className={classNames} rel="noopener noreferrer" target="_blank" to={href} {...props}>
        {children}
      </RouterLink>
    );
  }

  return (
    <RouterLink className={classNames} to={href} {...props}>
      {children}
    </RouterLink>
  );
};
