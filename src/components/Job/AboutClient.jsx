import React, { useRef, useEffect } from "react";
import Location from "@/components/common/Location";
import RatingDisplay from "@/components/common/RatingDisplay";

const AboutClient = ({ client }) => {
  return (
    <div className="w-fit flex flex-col gap-1">
      <h4 className=" text-xl font-medium text-black ">About the client</h4>
      <Location wilaya="tiaret" city="tiaret" size="sm" />

      <RatingDisplay rating={4.5} />

      <p className=" text-sm font-medium text-black">73 jobs posted</p>
      <p className=" text-sm font-medium text-black">DZD 1.4K total spent</p>
      <p className=" text-sm font-medium text-black">
        Member since Jan 25, 2010
      </p>
    </div>
  );
};

export default AboutClient;
