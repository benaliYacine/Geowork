// ExperienceForm.js
import React from "react";

import { useFormContext } from "react-hook-form";
import GenericFormField from "@/components/GenericFormField";

import TextareaFormField from "@/components/TextareaFormField";

const ExperienceForm = () => {
  const form = useFormContext(); // Use form context to access form methods and state

  return (
    <>
      <GenericFormField
        control={form.control}
        name="title"
        label="Title *"
        placeholder="Experience title"
      />
      <TextareaFormField
        control={form.control}
        name="description"
        label="Description"
        placeholder="Tell us a little bit more about this experience"
      />
    </>
  );
};

export default ExperienceForm;
