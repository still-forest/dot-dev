import { Layout as LayoutBase } from "@still-forest/canopy/next";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className, header }: LayoutProps) => {
  return (
    <LayoutBase>
      {header && <LayoutBase.Header>{header}</LayoutBase.Header>}
      <LayoutBase.Body className={className}>{children}</LayoutBase.Body>
      <LayoutBase.Footer>
        <Footer />
      </LayoutBase.Footer>
    </LayoutBase>
  );
};
