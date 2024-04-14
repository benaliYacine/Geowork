import { React, useState } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import JobList from "@/components/allJobPosts/JobList";

export default function AllJobPosts() {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <div className="flex flex-col m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1440px] ">
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <h1 className="text-black font-header text-4xl font-bold">
                All Job Posts
              </h1>
              <Link to="/jobSlides" className="text-white">
                <Button variant="default" size="lg">
                  post a new job
                </Button>
              </Link>
            </div>
            <div className=" flex flex-col items-center mt-6">
              <JobList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
