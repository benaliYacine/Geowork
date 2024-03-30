import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AddEmploymentCard from "@/components/profile_slides/slideTree/AddEmploymentCard";
import AddEmploymentButton from "@/components/profile_slides/slideTree/AddEmploymentButton";
import EmploymentCard from "@/components/profile_slides/slideTree/EmploymentCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
// Define your schema for SlideOne
const slideOneSchema = z.object({
  roleTitle: z.string().min(1, "Role title is required"),
});

export default function SlideTree({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  // const [employments, setEmployments] = useState([]);

  const addEmployment = (newEmployment) => {
    updateProfileInfo({
      employments: [...profileInfo.employments, newEmployment],
    });
  };

  const deleteEmployment = (indexToDelete) => {
    const filteredEmployments = profileInfo.employments.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      employments: filteredEmployments,
    });
  };

  const editEmployment = (indexToEdit, updatedEmployment) => {
    const updatedEmployments = profileInfo.employments.map(
      (employment, index) =>
        index === indexToEdit ? updatedEmployment : employment
    );
    updateProfileInfo({
      employments: updatedEmployments,
    });
  };

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
    <div className="space-y-4">
      <div className="text-md text-primary font-header mb-2">3/7 Profile</div>
      <h2 className="text-4xl font-bold mb-4">
        Add Your Company Employment History
      </h2>
      <p className="text-md text-greyDark mb-4">
        Highlight your formal work experience here. Roles in companies or
        organizations showcase your professional journey and expertise.
      </p>
      {profileInfo.employments.length === 0 ? (
        <AddEmploymentCard addEmployment={addEmployment} />
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          {" "}
          {/* Add gap for spacing and items-center for vertical alignment */}
          <AddEmploymentButton addEmployment={addEmployment} />
          <ScrollArea className="h-full w-full">
            <div className="flex w-max space-x-4 p-4">
              {profileInfo.employments.map((employment, index) => (
                <EmploymentCard
                  key={index}
                  employment={employment}
                  title={employment.title}
                  currentlyIn={employment.currentlyIn}
                  company={employment.company}
                  location={employment.Location}
                  startDate={`${months[employment.date.start.month - 1]} ${
                    employment.date.start.year
                  }`}
                  endDate={
                    employment.currentlyIn
                      ? "Present"
                      : `${months[employment.date.end.month - 1]} ${
                          employment.date.end.year
                        }`
                  }
                  description={employment.description}
                  onEdit={(newEmp) => editEmployment(index, newEmp)}
                  onDelete={() => deleteEmployment(index)}
                  index={index}
                />
              ))}
            </div>
            <ScrollBar className="hidden" orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
