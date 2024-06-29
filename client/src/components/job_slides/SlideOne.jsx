import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import GenericFormField from "@/components/formFields/GenericFormField";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  title: z.string().min(1, "title is required"),
});

export default function SlideOne({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      title: jobInfo.title,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateJobInfo({ title: values.title });
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
            1/6 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Ok, lets start with a strong title.{" "}
          </h2>
          <p className="text-md text-greyDark mb-4">
            This helps your job post stand out to the right candidates. it’s the
            first thing they’ll see, so make it count!
          </p>
          <GenericFormField
            control={form.control}
            name="title"
            label="Job post title" // You can customize this label as needed
            placeholder="Your job post title "
          />
          <div className="w-full py-2">
            <h3 className=" text-black text-xl font-bold mb-1">
              Example titles
            </h3>
            <ul className=" list-disc list-inside p-2 space-y-2 text-greyDark">
              <li>
                I need an Electrician to fix a short circuit in my home's living
                room
              </li>
              <li>
                Looking for a Plumber to repair a leaking kitchen sink ASAP.
              </li>
              <li>
                Need a Painter to refresh the exterior of my two-story house.
              </li>
              <li>
                Looking for a Tutor to help with high school math and physics.
              </li>
            </ul>
          </div>
        </form>
      </Form>
    </div>
  );
}
