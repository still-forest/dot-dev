import { Button, type ButtonProps } from "@still-forest/canopy/next";
import { Loader, Send } from "lucide-react";

interface Props extends ButtonProps {
  submitting?: boolean;
  disabled?: boolean;
}

export const SubmitButton = ({ submitting = false, disabled = false, ...rest }: Props) => {
  const icon = submitting ? <Loader className="animate-spin" /> : <Send />;

  return (
    <Button
      aria-label={submitting ? "Sending..." : "Send"}
      disabled={disabled || submitting}
      icon={icon}
      type="submit"
      variant="primary"
      {...rest}
    />
  );
};
