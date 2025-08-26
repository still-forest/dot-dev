import { Heading } from "@still-forest/canopy";

export const SectionHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <Heading className="mt-4" family="serif" level="3" variant="muted" weight="light">
      {children}
    </Heading>
  );
};
