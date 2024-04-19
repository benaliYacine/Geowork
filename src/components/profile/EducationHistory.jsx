import { useState } from "react";
import EducationItem from "@/components/profile/EducationItem";
import AddEducationButton from "@/components/profile_slides/slideFive/AddEducationButton";
import { Separator } from "@/components/ui/separator";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
export default function EducationHistory({ profileInfo, updateProfileInfo }) {
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

  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="text-4xl font-header font-semibold mb-1">
              Education history
            </h3>
            <AddEducationButton addExperience={addEducation} />
          </div>
          <CollapsibleContainer>
            {profileInfo.educations.map((education, index) => (
              <>
                <EducationItem
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
                <Separator />
              </>
            ))}
          </CollapsibleContainer>
        </div>
      </div>
    </>
  );
}
