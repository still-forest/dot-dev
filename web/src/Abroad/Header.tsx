import { Box, Heading } from "@still-forest/canopy";
import { Link } from "react-router";

export const Header = () => {
  return (
    <Box className="mt-2 mb-8 border-border border-b py-4">
      <Link to="/abroad" className="flex items-center gap-2">
        <img src="/abroad/logo.png" alt="Abroad logo" className="w-[48px]" />
        <Heading level="1" className="font-abroad-brand">
          Abroad
        </Heading>
      </Link>
    </Box>
  );
};
