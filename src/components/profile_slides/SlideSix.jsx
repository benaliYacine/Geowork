import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import TextareaFormField from "@/components/formFields/TextareaFormField";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  Bio: z
    .string()
    .min(10, {
      message: "Your Bio must be at least 10 characters.",
    })
    .max(3000, {
      message: "Your Bio must not be longer than 3000 characters.",
    }),
});

export default function SlideOne({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      Bio: profileInfo.Bio,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateProfileInfo({ Bio: values.Bio });
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
            6/7 Profile
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Great. Now write a bio to tell the world about yourself.
          </h2>
          <p className="text-md text-greyDark mb-4">
            Your bio is your chance to tell potential clients who you are and
            what makes you stand out. Share your professional ethos, what drives
            you, and why clients should choose you.
          </p>

          <TextareaFormField
            control={form.control}
            name="Bio"
            label=""
            placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile.
        "
            height="180px"
          />
        </form>
      </Form>
    </div>
  );
}
