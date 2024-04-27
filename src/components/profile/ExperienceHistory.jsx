import { useState, useContext } from "react";
import ExperienceItem from "@/components/profile/ExperienceItem";
import AddExperienceButton from "@/components/profile_slides/slideFour/AddExperienceButton";
import { Separator } from "@/components/ui/separator";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { EditContext } from "@/components/profile/Profile";
export default function ExperienceHistory({ profileInfo, updateProfileInfo }) {
  const addExperience = async (newExperience) => {
    const response = await axios.patch(
      "/api/professionnels/addExperience",
      newExperience
    );
    console.log(response.data);
    updateProfileInfo({
      experiences: [...profileInfo.experiences, newExperience],
    });
  };

  const deleteExperience = async (indexToDelete) => {
    const filteredExperiences = profileInfo.experiences.filter(
      (_, index) => index !== indexToDelete
    );
    const response = await axios.patch(
      "/api/professionnels/modifyExperience",
      filteredExperiences
    );
    console.log(response.data);
    updateProfileInfo({
      experiences: filteredExperiences,
    });
  };

  const editExperience = async (indexToEdit, updatedExperience) => {
    const updatedExperiences = profileInfo.experiences.map(
      (experience, index) =>
        index === indexToEdit ? updatedExperience : experience
    );
    const response = await axios.patch(
      "/api/professionnels/modifyExperience",
      updatedExperiences
    );
    console.log(response.data);
    updateProfileInfo({
      experiences: updatedExperiences,
    });
  };
  const { edit } = useContext(EditContext);
  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="text-4xl font-header font-semibold mb-1">
              Experience history
            </h3>
            {edit && <AddExperienceButton addExperience={addExperience} />}
          </div>
          <CollapsibleContainer>
            {profileInfo.experiences.length == 0 ? (
              <div className=" text-lg w-full p-3 h-fit text-primary flex justify-center items-center">
                there is no items here
              </div>
            ) : (
              profileInfo.experiences.map((experience, index) => (
                <div key={uuid()} className="mb-4">
                  <ExperienceItem
                    key={uuid()}
                    experience={experience}
                    title={experience.title}
                    description={experience.description}
                    onEdit={(newExp) => editExperience(index, newExp)}
                    onDelete={() => deleteExperience(index)}
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
