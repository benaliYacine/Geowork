import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingDisplay from "@/components/jobPost/RatingDisplay";
import Location from "@/components/jobPost/Location";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ExpertItem({ expert, setEdit }) {
  return (
    <div className="flex flex-col items-center w-full  mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center p-2 w-full">
        <div className="flex mr-auto">
          <div className=" mr-4">
            <Avatar>
              <AvatarImage src={expert.avatarUrl} alt={expert.name} />
              <AvatarFallback>{expert.initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow mb-2">
            <h3 className="text-lg font-semibold mb-1">{expert.name}</h3>
            <p className="text-sm text-gray-600 mb-1">{expert.role}</p>
            <RatingDisplay rating={expert.rating} size="sm" />
            <Location wilaya={expert.wilaya} city={expert.city} size="sm" />
          </div>
        </div>
        <div className=" mb-0 ml-auto sm:ml-0 sm:mb-auto">
          <Button variant="outline" size="sm" onClick={() => setEdit(true)}>
            Invite to Job
          </Button>
        </div>
      </div>
      <Separator />
    </div>
  );
}
