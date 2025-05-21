import { Container, Flex, Heading } from "@still-forest/canopy";

export const Header = () => {
  return (
    <Container>
      <Flex justify="between" align="center">
        <Flex align="end" gap="2">
          <Heading level="1">Still Forest</Heading>
        </Flex>
      </Flex>
    </Container>
  );
};
