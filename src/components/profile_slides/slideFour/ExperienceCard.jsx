import React from "react";

import exp from "@/assets/illustrations/exp.svg";
import DeleteExperienceButton from "@/components/profile_slides/slideFour/DeleteExperienceButton";

import EditExperienceButton from "@/components/profile_slides/slideFour/EditExperienceButton";
const ExperienceCard = ({
  title,
  description,
  experience,
  onEdit,
  onDelete,
  index,
}) => {
  return (
    <div className="w-96 min-w-96 h-52 min-h-52 p-3 bg-background rounded-3xl flex flex-row justify-between">
      <img src={exp} alt="experience" className="w-16 h-16 rounded-full" />
      <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
        <div className="flex gap-2 items-start">
          <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
            {title}
          </h3>
          <div className="flex gap-2">
            <EditExperienceButton
              experience={experience}
              onEdit={(newExp) => {
                onEdit(newExp);
              }}
            />
            <DeleteExperienceButton onDelete={onDelete} />
          </div>
        </div>
        <p className="text-black line-clamp-2 overflow-hidden">{description}</p>
      </div>
    </div>
  );
};

export default ExperienceCard;
