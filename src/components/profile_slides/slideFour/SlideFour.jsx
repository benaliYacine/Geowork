import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import AddExperienceCard from "@/components/profile_slides/slideFour/AddExperienceCard";
import AddExperienceButton from "@/components/profile_slides/slideFour/AddExperienceButton";
import ExperienceCard from "@/components/profile_slides/slideFour/ExperienceCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function SlideFour({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  // const [Experiences, setExperiences] = useState([]);

  const addExperience = (newExperience) => {
    updateProfileInfo({
      experiences: [...profileInfo.experiences, newExperience],
    });
  };

  const deleteExperience = (indexToDelete) => {
    const filteredExperiences = profileInfo.experiences.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      experiences: filteredExperiences,
    });
  };

  const editExperience = (indexToEdit, updatedExperience) => {
    const updatedExperiences = profileInfo.experiences.map(
      (experience, index) =>
        index === indexToEdit ? updatedExperience : experience
    );
    updateProfileInfo({
      experiences: updatedExperiences,
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
      <div className="text-md text-primary font-header mb-2">4/7 Profile</div>
      <h2 className="text-4xl font-bold mb-4">
        If you have any other relevant work experience, add it here.
      </h2>
      <p className="text-md text-greyDark mb-4">
        Here's where you can detail informal work, like helping in a family
        business, freelance projects, or community services. Every bit of
        experience counts.
      </p>
      {profileInfo.experiences.length === 0 ? (
        <AddExperienceCard addExperience={addExperience} />
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          {" "}
          {/* Add gap for spacing and items-center for vertical alignment */}
          <AddExperienceButton addExperience={addExperience} />
          <ScrollArea className="h-full w-full">
            <div className="flex w-max space-x-4 p-4">
              {profileInfo.experiences.map((experience, index) => (
                <ExperienceCard
                  key={index}
                  experience={experience}
                  title={experience.title}
                  description={experience.description}
                  onEdit={(newExp) => editExperience(index, newExp)}
                  onDelete={() => deleteExperience(index)}
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
