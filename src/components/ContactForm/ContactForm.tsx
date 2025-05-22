import { Alert, Button, type ButtonProps, Flex, TextInput } from "@still-forest/canopy";
import { CircleX, Loader, Send } from "lucide-react";
import { useState } from "react";
import { formSubmit } from "./formSubmit";
import type { FormData } from "./types";

interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  submitting: boolean;
}

interface Props extends ButtonProps {
  submitting?: boolean;
  disabled?: boolean;
}

const SubmitButton = ({ submitting = false, disabled = false, ...rest }: Props) => {
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

const Form = ({ onSubmit, onCancel, submitting }: FormProps) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="row" gap="2">
        <Flex.Item className="min-w-[220px]">
          <TextInput
            placeholder="your@email.com"
            name="email"
            value={formData.email}
            onChange={handleChange}
            aria-label="Email"
          />
        </Flex.Item>
        <Flex.Item flex="1">
          <TextInput
            placeholder="Your brief message here..."
            name="message"
            value={formData.message}
            onChange={handleChange}
            aria-label="Message"
            className="grow"
          />
        </Flex.Item>
        <Flex justify="end" gap="2">
          <SubmitButton submitting={submitting} />
          <Button variant="secondary" onClick={onCancel} icon={<CircleX />} aria-label="Cancel" />
        </Flex>
      </Flex>
    </form>
  );
};

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await formSubmit(data);
      setIsOpen(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex direction="col" gap="2" className="w-full" data-testid="contact-form">
      {submitError && <Alert message={submitError} title="Submission failure" type="error" />}
      {!isOpen && (
        <Flex justify="center">
          <Button onClick={() => setIsOpen(true)}>Get in touch</Button>
        </Flex>
      )}
      {isOpen && <Form onSubmit={handleSubmit} onCancel={() => setIsOpen(false)} submitting={isSubmitting} />}
    </Flex>
  );
};
