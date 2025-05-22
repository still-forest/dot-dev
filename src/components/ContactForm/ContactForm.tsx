import { Button, Flex, TextInput } from "@still-forest/canopy";
import { useState } from "react";
import { formSubmit } from "./formSubmit";
import type { FormData } from "./types";

interface FormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

const Form = ({ onSubmit, onCancel }: FormProps) => {
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
    <Flex direction="col" gap="2">
      <form onSubmit={handleSubmit}>
        <TextInput label="Email" name="email" value={formData.email} onChange={handleChange} />
        <TextInput label="Message" name="message" value={formData.message} onChange={handleChange} />
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

  const handleSubmit = (data: FormData) => {
    setIsOpen(false);
    formSubmit(data);
  };

  return (
    <Flex direction="col" gap="2">
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Get in touch</Button>}
      {isOpen && <Form onSubmit={handleSubmit} onCancel={() => setIsOpen(false)} />}
    </Flex>
  );
};
