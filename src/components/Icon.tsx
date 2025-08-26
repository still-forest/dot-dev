import type { SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  src: string;
  size?: number;
}

export const Icon = ({ src, size = 32, ...props }: IconProps) => {
  return <img alt="Icon" height={size} src={src} width={size} {...props} />;
};
