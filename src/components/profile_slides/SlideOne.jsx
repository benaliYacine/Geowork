import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import GenericFormField from "@/components/formFields/GenericFormField";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  roleTitle: z.string().min(1, "Role title is required"),
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
      roleTitle: profileInfo.roleTitle,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateProfileInfo({ roleTitle: values.roleTitle });
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
            1/7 Profile
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Ok, let's start with a strong title that describes what you do.
          </h2>
          <p className="text-md text-greyDark mb-4">
            It’s the very first thing clients see, so make it count. Stand out
            by describing your expertise in your own words.
          </p>
          <GenericFormField
            control={form.control}
            name="roleTitle"
            label="Your Professional Role" // You can customize this label as needed
            placeholder="Your professional role"
          />
        </form>
      </Form>
    </div>
  );
}
