import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingDisplay from "@/components/expertList/RatingDisplay";
import Location from "@/components/common/Location";
import SendInvitation from "@/components/expertList/SendInvitation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProfileDrawer from "@/components/expertList/ProfileDrawer";
export default function ExpertItem({ expert }) {
  
  function getInitials(name) {
    // Split the name by spaces into an array
    const parts = name.split(" ");

    // Get the first letter of the first part and the first letter of the last part
    const initials = parts[0][0] + parts[1][0];

    // Return the initials in uppercase
    return initials.toUpperCase();
  }
  return (
    <div className="flex flex-col items-center w-full  mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center p-2 w-full">
        <div className="flex mr-auto">
          <div className=" mr-4">
            <Avatar>
              <AvatarImage src={expert.avatarUrl} alt={expert.name} />
              <AvatarFallback>{getInitials(expert.name)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-grow mb-2">
            <ProfileDrawer expert={expert} />

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
