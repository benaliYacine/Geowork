// EducationForm.js
import React from "react";

import { getYearsRange } from "@/lib/utils";

import { useFormContext } from "react-hook-form";
import GenericFormField from "@/components/GenericFormField";
import ComboBoxComponent from "@/components/ComboBoxComponent";
import TextareaFormField from "@/components/TextareaFormField";

const currentYear = new Date().getFullYear();
const yearItems = getYearsRange(1990, currentYear + 5);
const EducationForm = () => {
  const form = useFormContext(); // Use form context to access form methods and state

  return (
    <>
      <GenericFormField
        control={form.control}
        name="school"
        label="school *"
        placeholder="School title"
      />
      <GenericFormField
        control={form.control}
        name="degree"
        label="Degree *"
        placeholder="Degree name"
      />
      <GenericFormField
        control={form.control}
        name="fieldOfStudy"
        label="Field Of Study *"
        placeholder="Field of study"
      />
      <div>
        <div className="flex space-x-2">
          <ComboBoxComponent
            control={form.control}
            name="datesAttended.start"
            label="Start Year"
            itemList={yearItems}
            placeholder="Start Year"
          />
          <ComboBoxComponent
            control={form.control}
            name="datesAttended.end"
            label="End Year"
            itemList={yearItems}
            placeholder="End Year"
          />
        </div>
      </div>
      <TextareaFormField
        control={form.control}
        name="description"
        label="Description"
        placeholder="Tell us a little bit more about this education"
      />
    </>
  );
};

export default EducationForm;
