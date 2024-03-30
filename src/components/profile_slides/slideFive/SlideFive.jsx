import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";


import AddEducationCard from "@/components/profile_slides/slideFive/AddEducationCard";
import AddEducationButton from "@/components/profile_slides/slideFive/AddEducationButton";
import EducationCard from "@/components/profile_slides/slideFive/EducationCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";


export default function SlideTree({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  const addEducation = (newEducation) => {
    updateProfileInfo({
      educations: [...profileInfo.educations, newEducation],
    });
  };

  const deleteEducation = (indexToDelete) => {
    const filteredEducations = profileInfo.educations.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      educations: filteredEducations,
    });
  };

  const editEducation = (indexToEdit, updatedEducation) => {
    const updatedEducations = profileInfo.educations.map((education, index) =>
      index === indexToEdit ? updatedEducation : education
    );
    updateProfileInfo({
      educations: updatedEducations,
    });
  };

  const form = useForm({});

  const onSubmit = form.handleSubmit((values) => {
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
        Add Your Education History
      </h2>
      <p className="text-md text-greyDark mb-4">
        Highlight your formal work experience here. Roles in companies or
        organizations showcase your professional journey and expertise.
      </p>
      {profileInfo.educations.length === 0 ? (
        <AddEducationCard addEducation={addEducation} />
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          {" "}
          {/* Add gap for spacing and items-center for vertical alignment */}
          <AddEducationButton addEducation={addEducation} />
          <ScrollArea className="h-full w-full">
            <div className="flex w-max space-x-4 p-4">
              {profileInfo.educations.map((education, index) => (
                <EducationCard
                  key={index}
                  education={education}
                  school={education.school}
                  degree={education.degree}
                  fieldOfStudy={education.fieldOfStudy}
                  startDate={`${education.datesAttended.start}`}
                  endDate={`${education.datesAttended.end}`}
                  description={education.description}
                  onEdit={(newEdu) => editEducation(index, newEdu)}
                  onDelete={() => deleteEducation(index)}
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
