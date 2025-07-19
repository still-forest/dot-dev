import { Layout as LayoutBase } from "@still-forest/canopy";
import { Footer } from "@/components/Footer";

interface LayoutProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  className?: string;
}

export const Layout = ({ children, className, header }: LayoutProps) => {
  return (
    <LayoutBase className="h-screen">
      {header && <LayoutBase.Header>{header}</LayoutBase.Header>}
      <LayoutBase.Body className={className}>{children}</LayoutBase.Body>
      <LayoutBase.Footer>
        <Footer />
      </LayoutBase.Footer>
    </LayoutBase>
  );
};
