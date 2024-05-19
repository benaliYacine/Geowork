import React from "react";
import Category from "@/components/common/Category";
import Location from "@/components/common/Location";
import DateRange from "@/components/common/DateRange";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import RatingDisplay from "@/components/common/RatingDisplay";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import { Badge } from "@/components/ui/badge";
// import DeleteEducationButton from "@/components/profile_slides/slideFive/DeleteEducationButton";

// import EditEducationButton from "@/components/profile_slides/slideFive/EditEducationButton";
const GeoworkItem = ({ job }) => {
  return (
    <div className="flex flex-col items-center w-full  mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center  w-full mb-2">
        <div className="flex w-full">
          <div className=" mr-2 flex "></div>

          <div className="flex items-start justify-between gap-1 flex-col ">
            <Button
              variant="link"
              size="none"
              className="text-2xl line-clamp-2 font-medium font-sans text-foreground hover:text-primary flex-grow"
            >
              {job.title}
            </Button>
            <Category
              category={job.category}
              subCategory={job.subCategory}
              size="sm"
            />
            <RatingDisplay rating={job.rate} size={120} />
            <p className="font-light italic">
              Expert Feedback - " {job.feedback}"
            </p>
            {/* {job.canceled && <Badge variant="destructive">Canceled</Badge>} */}
          </div>
        </div>
        <div className=" ml-auto sm:ml-0 sm:mb-auto flex flex-col items-end w-full">
          <DateRange startDate={job.startDate} endDate={job.endDate} />
          <p className="text-[18px] text-primary font-bold ">{job.budget}</p>
          
        </div>
      </div>

      {/* <Separator /> */}
    </div>
  );
};

export default GeoworkItem;
