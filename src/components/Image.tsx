import { Flex } from "@still-forest/canopy";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

export type FixedImageProps = Omit<ImageProps, "src" | "alt" | "width" | "height">;

export interface ImageProps extends NextImageProps {
  width?: number;
  height?: number;
  size?: number;
  className?: string;
}

export const Image = ({ src, alt, width, height, size, className, ...props }: ImageProps) => {
  if (!size && !(width && height)) {
    throw new Error("Either size or width and height must be provided");
  }

  return (
    <Flex align="center" className="flex-auto" justify="center">
      <NextImage alt={alt} className={className} height={height || size} src={src} width={width || size} {...props} />
    </Flex>
  );
};
