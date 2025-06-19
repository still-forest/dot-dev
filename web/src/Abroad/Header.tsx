import { Heading } from "@still-forest/canopy";
import { Link } from "react-router";

export const Header = () => {
  return (
    <Link to="/abroad">
      <Heading level="1">Abroad</Heading>
    </Link>
  );
};
