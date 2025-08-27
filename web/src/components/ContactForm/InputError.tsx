import { Text } from "@still-forest/canopy/next";

export const InputError = ({ message }: { message: string }) => {
  return (
    <Text size="xs" variant="destructive">
      {message}
    </Text>
  );
};
