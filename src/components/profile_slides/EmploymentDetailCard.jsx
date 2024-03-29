import React from "react";
import IconButton from "../common/IconButton";
import { Pencil, Trash2 } from "lucide-react";
import emp from "../../assets/illustrations/emp.svg";
import DeleteEmploymentButton from "./DeleteEmploymentButton";
const EmploymentDetailCard = ({
  title = "test",
  currentlyIn = true,
  company = "test",
  location = "test",
  startDate = "test",
  endDate = "test",
  description = "test test test test test test test test test test test test test  test test test test test test test test test  test test test test test test test test test  test test test test test test test test test test test test test test test test test test test test test test test test test test",
  onEdit,
  onDelete,
}) => {
  const displayDate = `${startDate} - ${currentlyIn ? "Present" : endDate}`;

  return (
    <div className="w-96 h-52 min-h-52 p-3 bg-background rounded-3xl flex flex-row justify-between">
      <img src={emp} alt="employment" className="w-16 h-16 rounded-full" />
      <div className="flex-grow p-1 flex flex-col gap-1 overflow-hidden">
        <div className="flex gap-2 items-start">
          <h3 className="text-2xl font-medium font-sans text-foreground flex-grow">
            {title}
          </h3>
          <div className="flex gap-2">
            <IconButton variant="primary" onClick={onEdit}>
              <Pencil className="h-4 w-4" />
            </IconButton>
            <DeleteEmploymentButton/>
          </div>
        </div>
        <div className="text-sm text-greyDark">
          {company} | {location}
        </div>
        <div className="text-sm text-greyDark">{displayDate}</div>
        <p className="text-black line-clamp-2 overflow-hidden">{description}</p>
      </div>
    </div>
  );
};

export default EmploymentDetailCard;
