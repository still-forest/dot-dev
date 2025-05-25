import { Text } from "@still-forest/canopy";

export const InputError = ({ message }: { message: string }) => {
  return (
    <Text variant="destructive" size="xs">
      {message}
    </Text>
  );
};
