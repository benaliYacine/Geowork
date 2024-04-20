import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingDisplay from "@/components/expertList/RatingDisplay";
import Location from "@/components/common/Location";
import SendInvitation from "@/components/expertList/SendInvitation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ExpertItem({ expert }) {
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
            <Button variant="title" className="text-lg font-semibold mb-1 " size="none">
              {expert.name}
            </Button>

            <p className="text-sm text-gray-600 mb-1">{expert.role}</p>
            <div className="mb-1">
              <RatingDisplay rating={expert.rating} />
            </div>
            <Location wilaya={expert.wilaya} city={expert.city} size="sm" />
          </div>
        </div>
        <div className=" mb-0 ml-auto sm:ml-0 sm:mb-auto">
          <SendInvitation expert={expert} />
        </div>
      </div>
      <Separator />
    </div>
  );
}
