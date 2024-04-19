import React from "react";

import emp from "@/assets/illustrations/emp.svg";
import DeleteEmploymentButton from "@/components/profile_slides/slideThree/DeleteEmploymentButton";

import EditEmploymentButton from "@/components/profile_slides/slideThree/EditEmploymentButton";


const EmploymentItem = ({
  title,
  currentlyIn,
  company,
  location,
  startDate,
  endDate,
  description,
  employment,
  onEdit,
  onDelete,
  index,
}) => {
  const displayDate = `${startDate} - ${currentlyIn ? "Present" : endDate}`;

  return (
    <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
      <div className="flex gap-2 items-start">
        <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
          {title}
        </h3>
        <div className="flex gap-2">
          <EditEmploymentButton
            variant="outlined"
            employment={employment}
            onEdit={(newEmp) => {
              onEdit(newEmp);
            }}
          />
          <DeleteEmploymentButton onDelete={onDelete} variant="outlined"/>
        </div>
      </div>
      <div className="text-sm text-greyDark">
        {company} | {location}
      </div>
      <div className="text-sm text-greyDark">{displayDate}</div>
      <p className="text-black line-clamp-2 overflow-hidden">{description}</p>
    </div>
  );
};

export default EmploymentItem;
