import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router";

interface LinkProps extends RouterLinkProps {
  to: string;
  noStyle?: boolean;
  className?: string;
}

export const Link = ({ children, to, className, noStyle, ...props }: LinkProps) => {
  const classNames = noStyle ? className : [className, "hover:underline"].filter(Boolean).join(" ");

  const external = to.startsWith("http");

  if (external) {
    return (
      <a className={classNames} href={to} rel="noopener noreferrer" target="_blank" {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink className={classNames} to={to} {...props}>
      {children}
    </RouterLink>
  );
};
