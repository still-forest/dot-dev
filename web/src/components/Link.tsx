import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router";

interface LinkProps extends RouterLinkProps {
  noStyle?: boolean;
  className?: string;
}

export const Link = ({ children, className, noStyle, ...props }: LinkProps) => {
  const classNames = noStyle ? className : `hover:underline ${className}`;

  return (
    <RouterLink className={classNames} {...props}>
      {children}
    </RouterLink>
  );
};
