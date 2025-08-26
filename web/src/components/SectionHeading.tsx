import { Heading } from "@still-forest/canopy";

export const SectionHeading = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <Heading className={`mt-4 ${className}`} family="serif" level="3" variant="muted" weight="light">
      {children}
    </Heading>
  );
};
