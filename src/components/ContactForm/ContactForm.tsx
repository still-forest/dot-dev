import { Button, Flex, TextInput } from "@still-forest/canopy";
import { useState } from "react";

interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

interface FormData {
  email: string;
  message: string;
}

const Form = ({ onSubmit, onCancel }: FormProps) => {
  return (
    <Flex direction="col" gap="2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target as HTMLFormElement);
          console.log("formData", formData);
          const data = Object.fromEntries(formData.entries()) as FormData;
          onSubmit(data);
        }}
      >
        <TextInput label="Email" name="email" />
        <TextInput label="Message" name="message" />
        <Flex justify="end" gap="2">
          <Button type="submit">Send</Button>
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export const ContactForm = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex direction="col" gap="2">
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Get in touch</Button>}
      {isOpen && <Form onSubmit={() => setIsOpen(false)} onCancel={() => setIsOpen(false)} />}
    </Flex>
  );
};
