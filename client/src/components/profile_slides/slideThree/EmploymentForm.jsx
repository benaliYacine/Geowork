// EmploymentForm.js
import React from "react";

import { FormLabel } from "@/components/ui/form";

import { getYearsRange } from "@/lib/utils";

import { useFormContext } from "react-hook-form";
import GenericFormField from "@/components/formFields/GenericFormField";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";
import CheckboxFormField from "@/components/formFields/CheckboxFormField";
import TextareaFormField from "@/components/formFields/TextareaFormField";

const monthItems = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];

const currentYear = new Date().getFullYear();
const yearItems = getYearsRange(1990, currentYear);
const EmploymentForm = () => {
  const form = useFormContext(); // Use form context to access form methods and state
  const currentlyIn = form.watch("currentlyIn");

  return (
    <>
      <GenericFormField
        control={form.control}
        name="title"
        label="Title *"
        placeholder="Employment title"
      />
      <GenericFormField
        control={form.control}
        name="company"
        label="Company *"
        placeholder="Company name"
      />
      <GenericFormField
        control={form.control}
        name="Location"
        label="Location *"
        placeholder="Employment location"
      />
      <CheckboxFormField
        control={form.control}
        name="currentlyIn"
        label="I am currently working in this role"
      />
      <div>
        <FormLabel>Start Date *</FormLabel>
        <div className="flex space-x-2">
          <ComboBoxComponent
            control={form.control}
            name="date.start.month"
            label=""
            itemList={monthItems}
            placeholder="Month"
          />
          <ComboBoxComponent
            control={form.control}
            name="date.start.year"
            label=""
            itemList={yearItems}
            placeholder="Year"
          />
        </div>
      </div>
      {!currentlyIn && (
        <div>
          <FormLabel>End Date</FormLabel>
          <div className="flex space-x-2">
            <ComboBoxComponent
              control={form.control}
              name="date.end.month"
              label=""
              itemList={monthItems}
              placeholder="Month"
            />
            <ComboBoxComponent
              control={form.control}
              name="date.end.year"
              label=""
              itemList={yearItems}
              placeholder="Year"
            />
          </div>
        </div>
      )}
      <TextareaFormField
        control={form.control}
        name="description"
        label="Description"
        placeholder="Tell us a little bit more about this employment"
      />
    </>
  );
};

export default EmploymentForm;
