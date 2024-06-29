import React from "react";
import emp from "@/assets/illustrations/emp.svg";
import DeleteEmploymentButton from "@/components/profile_slides/slideThree/DeleteEmploymentButton";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import { useContext } from "react";
import EditEmploymentButton from "@/components/profile_slides/slideThree/EditEmploymentButton";
import { EditContext } from "@/components/profile/Profile"; 

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
  const  {edit}  = useContext(EditContext);
  return (
    <div className="flex-grow p-1 flex flex-col gap-2 overflow-hidden">
      <div className="flex gap-2 items-start">
        <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
          {title}
        </h3>
        {edit && (
          <div className="flex gap-2">
            <EditEmploymentButton
              variant="outlined"
              employment={employment}
              onEdit={(newEmp) => {
                onEdit(newEmp);
              }}
            />
            <DeleteEmploymentButton onDelete={onDelete} variant="outlined" />
          </div>
        )}
      </div>
      <div className="text-sm text-greyDark">
        {company} | {location}
      </div>
      <div className="text-sm text-greyDark">{displayDate}</div>
      <CollapsibleTextContainer collapsedHeight="25px">
        <p className="text-black overflow-hidden">{description}</p>
      </CollapsibleTextContainer>
    </div>
  );
};

export default EmploymentItem;
