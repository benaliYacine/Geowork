import { useState, useContext } from "react";
import EducationItem from "@/components/profile/EducationItem";
import AddEducationButton from "@/components/profile_slides/slideFive/AddEducationButton";
import { Separator } from "@/components/ui/separator";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { EditContext } from "@/components/profile/Profile";
export default function EducationHistory({ profileInfo, updateProfileInfo }) {
  const addEducation = async (newEducation) => {
    const response = await axios.patch(
      "/api/professionnels/addEducation",
      newEducation
    );
    console.log(response.data);
    updateProfileInfo({
      educations: [...profileInfo.educations, newEducation],
    });
  };

  const editEducation = async (indexToEdit, updatedEducation) => {
    const updatedEducations = profileInfo.educations.map((education, index) =>
      index === indexToEdit ? updatedEducation : education
    );
    const response = await axios.patch(
      "/api/professionnels/modifyEducation",
      updatedEducations
    );
    console.log(response.data);
    updateProfileInfo({
      educations: updatedEducations,
    });
  };
  const deleteEducation = async (indexToDelete) => {
    const filteredEducations = profileInfo.educations.filter(
      (_, index) => index !== indexToDelete
    );
    const response = await axios.patch(
      "/api/professionnels/modifyEducation",
      filteredEducations
    );
    console.log(response.data);
    updateProfileInfo({
      educations: filteredEducations,
    });
  };
  const { edit } = useContext(EditContext);
  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="text-4xl font-header font-semibold mb-1">
              Education history
            </h3>
            {edit && <AddEducationButton addEducation={addEducation} />}
          </div>
          <CollapsibleContainer>
            {profileInfo.educations.length == 0 ? (
              <div className=" text-lg w-full p-3 h-fit text-primary flex justify-center items-center">
                there is no items here
              </div>
            ) : (
              profileInfo.educations.map((education, index) => (
                <div key={uuid()} className="mb-4">
                  <EducationItem
                    key={uuid()}
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
                </div>
              ))
            )}
          </CollapsibleContainer>
        </div>
      </div>
    </>
  );
}
