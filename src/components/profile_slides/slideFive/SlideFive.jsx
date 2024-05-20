import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import AddEducationCard from "@/components/profile_slides/slideFive/AddEducationCard";
import AddEducationButton from "@/components/profile_slides/slideFive/AddEducationButton";
import EducationCard from "@/components/profile_slides/slideFive/EducationCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
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
      <div className="text-md text-primary font-header mb-2">5/7 Profile</div>
      <h2 className="text-4xl font-bold mb-4">
        Detail Your Educational Background
      </h2>
      <p className="text-md text-greyDark mb-4">
        Add your academic achievements and any relevant training or
        certifications here. Your education helps clients understand your
        qualifications and expertise.
      </p>
      {profileInfo.educations.length === 0 ? (
        <div className="px-12 py-6">
          <AddEducationCard addEducation={addEducation} />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {" "}
          {/* Add gap for spacing and items-center for vertical alignment */}
          <AddEducationButton addEducation={addEducation} />
          <Carousel
            opts={{
              align: "start",
            }}
            className={
              profileInfo.employments.length > 3
                ? "max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full mx-12 my-4"
                : "max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full mx-0 my-4"
            }
          >
            <CarouselContent>
              {profileInfo.educations.map((education, index) => (
                <CarouselItem key={index} className="basis-1/">
                  {/* basis-1/ ghi bah na7i el basis full li fel carousel mane9derch na7iha temak parceque ne7tajha fel job images carousel */}

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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={!(profileInfo.employments.length > 3) && " hidden"}
            />
            <CarouselNext
              className={!(profileInfo.employments.length > 3) && " hidden"}
            />
          </Carousel>
        </div>
      )}
    </div>
  );
}
