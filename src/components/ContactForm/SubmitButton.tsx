import { Button, type ButtonProps } from "@still-forest/canopy";
import { Loader, Send } from "lucide-react";

interface Props extends ButtonProps {
  submitting?: boolean;
  disabled?: boolean;
}

export const SubmitButton = ({ submitting = false, disabled = false, ...rest }: Props) => {
  const icon = submitting ? <Loader className="animate-spin" /> : <Send />;

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={disabled || submitting}
      icon={icon}
      aria-label={submitting ? "Sending..." : "Send"}
      {...rest}
    />
  );
};
