import React from "react";
import IconButton from "../common/IconButton";
import { Plus } from "lucide-react";
const EmploymentCard = ({ onClick }) => (
  <div
    className="w-96 h-52 p-8 bg-secondaryo rounded-3xl border border-dashed border-primary cursor-pointer flex flex-col justify-center items-start gap-4 transition duration-300 ease-in-out transform active:scale-100 hover:scale-105"
    onClick={onClick}
  >
    <div className="text-foreground text-3xl font-medium font-sans capitalize leading-tight flex flex-col gap-1">
      <IconButton variant="primary">
        <Plus className="h-4 w-4" />
      </IconButton>
      Add Employment
    </div>
  </div>
);

export default EmploymentCard;
