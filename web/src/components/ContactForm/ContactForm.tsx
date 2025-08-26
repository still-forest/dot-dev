import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Button, Flex, Text, Textarea, TextInput } from "@still-forest/canopy";
import { CircleX } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
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
      <Flex direction="col" gap="16">
        <Flex className="flex min-w-[220px] flex-col gap-y-2">
          <TextInput aria-label="Email" placeholder="your@email.com" {...register("email")} className="bg-input" />
          {errors.email && <InputError message={errors.email.message!} />}
        </Flex>
        <Flex.Item className="flex flex-col gap-y-2" flex="1">
          <Textarea
            aria-label="Message"
            placeholder="Your brief message here..."
            {...register("message")}
            className="grow bg-input"
          />
          {errors.message && <InputError message={errors.message.message!} />}
        </Flex.Item>
        <Flex gap="2">
          <SubmitButton disabled={!isValid} submitting={submitting}>
            Send
          </SubmitButton>
          <Button aria-label="Cancel" icon={<CircleX />} onClick={onCancel} variant="secondary">
            Cancel
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export const ContactForm = () => {
  const [hasSubmitted, setHasSubmitted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { canExecute, execute } = useRateLimit("contact-form", 60_000);
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    if (!canExecute()) {
      setSubmitError("You are sending messages too quickly. Please try again later.");
      setIsSubmitting(false);
      return;
    }

    execute(async () => {
      try {
        await formSubmit(data);
        setHasSubmitted(true);
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : "Failed to submit form");
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <Flex className="w-full flex-1" data-testid="contact-form" direction="col" gap="8">
      {submitError && <Alert message={submitError} title="Submission failure" type="error" />}
      {!hasSubmitted && <Form onCancel={handleCancel} onSubmit={handleSubmit} submitting={isSubmitting} />}
      {hasSubmitted && (
        <Flex align="center" direction="col" gap="12" justify="center">
          <Text align="center">
            Message sent successfully.
            <br />
            We will get back to you as soon as possible.
          </Text>
          <Button asChild className="w-fit">
            <Link to="/">Back to home</Link>
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
