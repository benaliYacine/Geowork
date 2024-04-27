import React from "react";
import { useContext } from "react";
import DeleteExperienceButton from "@/components/profile_slides/slideFour/DeleteExperienceButton";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import { EditContext } from "@/components/profile/Profile"; 

import EditExperienceButton from "@/components/profile_slides/slideFour/EditExperienceButton";
const ExperienceItem = ({
  title,
  description,
  experience,
  onEdit,
  onDelete,
  index,
}) => {
  const { edit } = useContext(EditContext);
  return (
    <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
      <div className="flex gap-2 items-start">
        <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
          {title}
        </h3>
        {edit && (
          <div className="flex gap-2">
            <EditExperienceButton
              variant="outlined"
              experience={experience}
              onEdit={(newExp) => {
                onEdit(newExp);
              }}
            />
            <DeleteExperienceButton onDelete={onDelete} variant="outlined" />
          </div>
        )}
      </div>
      <CollapsibleTextContainer collapsedHeight="25px">
        <p className="text-black overflow-hidden">{description}</p>
      </CollapsibleTextContainer>
    </div>
  );
};

export default ExperienceItem;
