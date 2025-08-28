import { Flex } from "@still-forest/canopy";

interface HeroImageProps {
  src: string;
  alt: string;
}

export const HeroImage = ({ src, alt }: HeroImageProps) => {
  return (
    <Flex align="center" className="flex-auto" justify="center">
      <img alt={alt} className="w-sm lg:w-lg" src={src} />
    </Flex>
  );
};
