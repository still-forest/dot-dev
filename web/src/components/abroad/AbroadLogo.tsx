import { type FixedImageProps, Image } from "@/components/Image";

export const AbroadLogo = ({ ...props }: FixedImageProps) => {
  return <Image alt="Abroad logo" height={733} src="/abroad/logo.png" width={1024} {...props} />;
};
