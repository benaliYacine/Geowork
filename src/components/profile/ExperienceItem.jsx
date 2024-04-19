import React from "react";

import DeleteExperienceButton from "@/components/profile_slides/slideFour/DeleteExperienceButton";

import EditExperienceButton from "@/components/profile_slides/slideFour/EditExperienceButton";
const ExperienceItem = ({
  title,
  description,
  experience,
  onEdit,
  onDelete,
  index,
}) => {
  return (
    
      <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
        <div className="flex gap-2 items-start">
          <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
            {title}
          </h3>
          <div className="flex gap-2">
          <EditExperienceButton
            variant="outlined"
              experience={experience}
              onEdit={(newExp) => {
                onEdit(newExp);
              }}
            />
            <DeleteExperienceButton onDelete={onDelete} variant="outlined"/>
          </div>
        </div>
        <p className="text-black line-clamp-4 overflow-hidden">{description}</p>
      </div>

  );
};

export default ExperienceItem;
