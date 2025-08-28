import { type FixedImageProps, Image } from "@/components/Image";

export const BrandIcon = ({ ...props }: FixedImageProps) => {
  return <Image alt="Still Forest logo" height={192} src="/icon-192.png" width={192} {...props} />;
};
