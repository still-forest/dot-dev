import { Text, type TextProps } from "@still-forest/canopy";

export const Paragraph = ({ children }: TextProps) => {
  return (
    <Text className="mb-2" family="sans">
      {children}
    </Text>
  );
};
