import { useState } from "react";
import ExperienceItem from "@/components/profile/ExperienceItem";
import AddExperienceButton from "@/components/profile_slides/slideFour/AddExperienceButton";
import { Separator } from "@/components/ui/separator";

export default function ExperienceHistory({
  profileInfo,
  updateProfileInfo,
}) {
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

  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="text-4xl font-header font-semibold mb-1">
              Experience history
            </h3>
            <AddExperienceButton addExperience={addExperience} />
          </div>
          {profileInfo.experiences.map((experience, index) => (
            <>
              <ExperienceItem
                key={index}
                experience={experience}
                title={experience.title}
                description={experience.description}
                onEdit={(newExp) => editExperience(index, newExp)}
                onDelete={() => deleteExperience(index)}
                index={index}
              />
              <Separator />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
