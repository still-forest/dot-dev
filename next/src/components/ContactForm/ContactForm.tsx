import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Flex, InputError, Text, TextInput } from "@still-forest/canopy";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRateLimit } from "@/hooks/useRateLimit";
import { contact } from "@/lib/actions/contact-actions";
import { type ContactFormData, contactSchema } from "@/lib/schema/contact-schema";
import { SubmitButton } from "./SubmitButton";

interface FormProps {
  onSubmit: (data: ContactFormData) => void;
  onCancel: () => void;
  submitting: boolean;
}

const Form = ({ onSubmit, onCancel, submitting }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex className="sm:flex-row" direction="col" gap="2">
        <Flex.Item className="flex min-w-[220px] flex-col gap-y-2">
          <TextInput aria-label="Email" placeholder="your@email.com" {...register("email")} className="bg-input" />
          {errors.email && <InputError message={errors.email.message!} />}
        </Flex.Item>
        <Flex.Item className="flex flex-col gap-y-2" flex="1">
          <TextInput
            aria-label="Message"
            placeholder="Your brief message here..."
            {...register("message")}
            className="grow bg-input"
          />
          {errors.message && <InputError message={errors.message.message!} />}
        </Flex.Item>
        <Flex gap="2" justify="end">
          <SubmitButton disabled={!isValid} submitting={submitting} />
          <Button aria-label="Cancel" icon={<CircleX />} onClick={onCancel} variant="secondary" />
        </Flex>
      </Flex>
    </form>
  );
};

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { canExecute, execute } = useRateLimit("contact-form", 60_000);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (!canExecute()) {
      setSubmitError("You are sending messages too quickly. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    execute(async () => {
      try {
        await contact(data);
        setIsOpen(false);
        setHasSubmitted(true);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Failed to submit form");
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return (
    <Flex className="w-full" data-testid="contact-form" direction="col" gap="2">
      {submitError && <Alert message={submitError} title="Submission failure" type="error" />}
      {!isOpen && !hasSubmitted && (
        <Flex justify="center">
          {canExecute() ? <Button onClick={() => setIsOpen(true)}>Get in touch</Button> : <Text>Welcome back.</Text>}
        </Flex>
      )}
      {isOpen && !hasSubmitted && (
        <Form onCancel={() => setIsOpen(false)} onSubmit={handleSubmit} submitting={isSubmitting} />
      )}
      {hasSubmitted && (
        <Flex justify="center">
          <Alert className="w-fit" message="Message sent successfully." type="success" />
        </Flex>
      )}
    </Flex>
  );
};
