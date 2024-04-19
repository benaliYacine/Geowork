import React from "react";
import Category from "@/components/common/Category";
import Location from "@/components/common/Location";
import DateRange from "@/components/common/DateRange";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import RatingDisplay from "@/components/expertList/RatingDisplay";

// import DeleteEducationButton from "@/components/profile_slides/slideFive/DeleteEducationButton";

// import EditEducationButton from "@/components/profile_slides/slideFive/EditEducationButton";
const GeoworkItem = ({ job, onEdit, onDelete }) => {
  return (
    <div className="flex flex-col items-center w-full  mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center p-1 w-full mb-2">
        <div className="flex w-full">
          <div className=" mr-4 flex ">
            <div
              className="bg-cover bg-center rounded-lg h-[100px] w-[120px]"
              style={{ backgroundImage: `url(${job.images[0]})` }}
            ></div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-2xl  line-clamp-2 font-medium font-sans text-foreground flex-grow">
                {job.title}
              </h3>
            </div>
            {/* <Category
                category={job.category}
                subCategory={job.subCategory}
                size="sm"
              /> */}
            <DateRange startDate={job.startDate} endDate={job.endDate} />
            <p className="text-[18px] text-primary font-bold ">{job.budget}</p>
            <Location wilaya={job.wilaya} city={job.city} size="sm" />
          </div>
        </div>
        <div className="  ml-auto sm:ml-0 sm:mb-auto">
          {/* TODO: diir l button ydiik lel page ta3 l job */}
          <Button variant="link" size="sm">
            view entire job poste
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div>
          <h4 className="text-xl text-foreground flex-grow mb-1">
            Job Description
          </h4>
          <p className="line-clamp-2">{job.description}</p>
        </div>
        <div>
          <div className="w-full flex items-center justify-between px-3">
            <h4 className="text-xl text-foreground flex-grow mb-1">
              Client Feedback
            </h4>
            <RatingDisplay rating={job.rate} size={120} />
          </div>
          <p className="line-clamp-1 font-light italic">" {job.feedback}"</p>
        </div>
      </div>
      {/* <Separator /> */}
    </div>
  );
};

export default GeoworkItem;
