import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import CurrencyFormField from "@/components/formFields/CurrencyFormField";
const toNumericValue = (value) => {
  const numericOnly = value.replace(/[^0-9,]/g, "");
  return parseInt(numericOnly.replace(/,/g, ""), 10);
};
const slideOneSchema = z.object({
  budget: z
    .string()
    .min(1, "budget is required")
    // Adjust regex as needed if your input format includes the "DZD" prefix.
    .regex(/^DZD  \d{1,3}(, \d{3})*$/, "budget is required"),
});

export default function SlideFour({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      budget: jobInfo.budget,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateJobInfo({ budget: values.budget });
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
            4/6 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Tell us about your budget.
          </h2>
          <p className="text-md text-greyDark mb-4">
            This will help us match you to talent within your range.
          </p>
          <CurrencyFormField
            control={form.control}
            name="budget"
            label="budget"
            placeholder="Enter your budget"
          />
          <p className="text-sm text-black">
            Set a price for the job and pay cash at the end of it. You can
          </p>
          <p className="text-sm text-black">
            negotiate this cost when you chat with your chosen expert.
          </p>
        </form>
      </Form>
    </div>
  );
}
