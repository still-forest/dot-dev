import { Flex } from "@still-forest/canopy";
import { Image, type ImageProps } from "./Image";

export const HeroImage = (props: ImageProps) => {
  return (
    <Flex align="center" className="flex-auto" justify="center">
      <Image className="w-sm lg:w-lg" {...props} />
    </Flex>
  );
};
