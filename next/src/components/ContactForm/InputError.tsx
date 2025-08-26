import { Text } from "@still-forest/canopy";

export const InputError = ({ message }: { message: string }) => {
  return (
    <Text size="xs" variant="destructive">
      {message}
    </Text>
  );
};
