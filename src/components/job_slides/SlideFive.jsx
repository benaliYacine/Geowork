import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import TextareaFormField from "@/components/formFields/TextareaFormField";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Your description must be at least 10 characters.",
    })
    .max(3000, {
      message: "Your description must not be longer than 3000 characters.",
    }),
});

export default function SlideFive({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      description: jobInfo.description,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateJobInfo({ description: values.description });
    inc(); // gedem el slide id al form valid
    // Proceed with your onSave logic or form values handling here
    console.log(values); // Handle the form values, for example, saving it
  });

  // Use useEffect to update submitFormRef with onSubmit function
  useEffect(() => {
    submitFormRef.current = onSubmit; // Allows the parent to trigger form submission
  }, [submitFormRef, onSubmit]);

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-md text-primary font-header mb-2">
            5/6 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">Describe what you need</h2>
          <p className="text-md text-greyDark mb-4">
            This is where you'll share what you need done. A clear and
            comprehensive job description not only attracts the right
            professionals but also sets the foundation for a successful
            collaboration. Include as much detail as possible to ensure a
            perfect match.
          </p>

          <TextareaFormField
            control={form.control}
            name="description"
            label="Job description"
            placeholder="Already have a description? Paste it here!"
            minHeight = "180px"
          />
        </form>
      </Form>
    </div>
  );
}
