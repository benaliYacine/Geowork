import React from "react";
import Location from "@/components/common/Location";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Category from "@/components/common/Category";
export default function JobItem({ job }) {
  return (
    <div className="flex flex-col items-center w-full mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center p-2 w-full">
        <div className="flex mr-auto">
          <div className=" mr-4">
            <div
              className="bg-cover bg-center rounded-lg h-[100px] w-[120px]"
              style={{ backgroundImage: `url(${job.images[0]})` }}
            ></div>
          </div>
          <div className="flex-grow mb-2">
            <h3 className="text-lg font-bold ">{job.title}</h3>
            <div className="">
              <Category
                category={job.category}
                subCategory={job.subCategory}
                size="sm"
              />
            </div>
            <p className="text-md text-primary font-semibold ">
              {job.budget}
            </p>
            <Location wilaya={job.wilaya} city={job.city} size="sm" />
          </div>
        </div>
        <div className="  ml-auto sm:ml-0 sm:mb-auto">
          {/* TODO: diir l button ydiik lel page ta3 l job */}
          <Button variant="outline" size="sm">
            Open Job Post
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}
