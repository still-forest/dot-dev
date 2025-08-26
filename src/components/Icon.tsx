import Image, { type ImageProps } from "next/image";

interface IconProps extends ImageProps {
  src: string;
  size?: number;
}

export const Icon = ({ src, size = 32, ...props }: IconProps) => {
  return <Image height={size} src={src} width={size} {...props} />;
};
