import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Flex, Text, TextInput } from "@still-forest/canopy";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRateLimit } from "@/hooks/useRateLimit";
import { formSubmit } from "./formSubmit";
import { InputError } from "./InputError";
import { SubmitButton } from "./SubmitButton";
import { type FormData, formSchema } from "./schema";

interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  submitting: boolean;
}

const Form = ({ onSubmit, onCancel, submitting }: FormProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="row" gap="2">
        <Flex.Item className="flex min-w-[220px] flex-col gap-y-2">
          <TextInput placeholder="your@email.com" aria-label="Email" {...register("email")} className="bg-input" />
          {errors.email && <InputError message={errors.email.message!} />}
        </Flex.Item>
        <Flex.Item flex="1" className="flex flex-col gap-y-2">
          <TextInput
            placeholder="Your brief message here..."
            aria-label="Message"
            {...register("message")}
            className="grow bg-input"
          />
          {errors.message && <InputError message={errors.message.message!} />}
        </Flex.Item>
        <Flex justify="end" gap="2">
          <SubmitButton disabled={!isValid} submitting={submitting} />
          <Button variant="secondary" onClick={onCancel} icon={<CircleX />} aria-label="Cancel" />
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

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    console.log("data", data);
    console.log("canExecute", canExecute());

    if (!canExecute()) {
      setSubmitError("You are sending messages too quickly. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    execute(async () => {
      try {
        await formSubmit(data);
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
    <Flex direction="col" gap="2" className="w-full" data-testid="contact-form">
      {submitError && <Alert message={submitError} title="Submission failure" type="error" />}
      {!isOpen && !hasSubmitted && (
        <Flex justify="center">
          {canExecute() ? <Button onClick={() => setIsOpen(true)}>Get in touch</Button> : <Text>Welcome back.</Text>}
        </Flex>
      )}
      {isOpen && !hasSubmitted && (
        <Form onSubmit={handleSubmit} onCancel={() => setIsOpen(false)} submitting={isSubmitting} />
      )}
      {hasSubmitted && (
        <Flex justify="center">
          <Alert message="Message sent successfully." type="success" className="w-fit" />
        </Flex>
      )}
    </Flex>
  );
};
