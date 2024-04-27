import React from "react";
import { useContext } from "react";
import DeleteEducationButton from "@/components/profile_slides/slideFive/DeleteEducationButton";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import EditEducationButton from "@/components/profile_slides/slideFive/EditEducationButton";
import { EditContext } from "@/components/profile/Profile"; 

const EducationItem = ({
  school,
  degree,
  fieldOfStudy,
  startDate,
  endDate,
  description,
  education,
  onEdit,
  onDelete,
  index,
}) => {
  const displayDate = `${startDate} - ${endDate}`;
  const { edit } = useContext(EditContext);
  return (
    <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
      <div className="flex gap-2 items-start">
        <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
          {school}
        </h3>
        {edit && (
          <div className="flex gap-2">
            <EditEducationButton
              variant="outlined"
              education={education}
              onEdit={(newEdu) => {
                onEdit(newEdu);
              }}
            />
            <DeleteEducationButton onDelete={onDelete} variant="outlined" />
          </div>
        )}
      </div>
      <div className="text-sm text-greyDark">
        {degree} | {fieldOfStudy}
      </div>
      <div className="text-sm text-greyDark">{displayDate}</div>
      <CollapsibleTextContainer collapsedHeight="25px">
        <p className="text-black overflow-hidden">{description}</p>
      </CollapsibleTextContainer>
    </div>
  );
};

export default EducationItem;
