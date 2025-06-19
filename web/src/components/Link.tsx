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
      <a href={to} className={classNames} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <RouterLink to={to} className={classNames} {...props}>
      {children}
    </RouterLink>
  );
};
