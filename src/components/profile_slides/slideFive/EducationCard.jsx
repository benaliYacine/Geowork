import React from "react";

import edu from "@/assets/illustrations/edu.svg";
import DeleteEducationButton from "@/components/profile_slides/slideFive/DeleteEducationButton";

import EditEducationButton from "@/components/profile_slides/slideFive/EditEducationButton";
const EducationCard = ({
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

  return (
    <div className="w-96 min-w-96 h-52 min-h-52 p-3 bg-background rounded-3xl flex flex-row justify-between">
      <img src={edu} alt="education" className="w-16 h-16 rounded-full" />
      <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
        <div className="flex gap-2 items-start">
          <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
            {school}
          </h3>
          <div className="flex gap-2">
            <EditEducationButton
              education={education}
              onEdit={(newEdu) => {
                onEdit(newEdu);
              }}
            />
            <DeleteEducationButton onDelete={onDelete} />
          </div>
        </div>
        <div className="text-sm text-greyDark">
          {degree} | {fieldOfStudy}
        </div>
        <div className="text-sm text-greyDark">{displayDate}</div>
        <p className="text-black line-clamp-2 overflow-hidden">{description}</p>
      </div>
    </div>
  );
};

export default EducationCard;
