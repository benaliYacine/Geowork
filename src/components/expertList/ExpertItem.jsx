import React from "react";
import axios from "axios";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingDisplay from "@/components/common/RatingDisplay";
import Location from "@/components/common/Location";
import SendInvitation from "@/components/expertList/SendInvitation";
import { Separator } from "@/components/ui/separator";
import ProfileDrawer from "@/components/expertList/ProfileDrawer";
import { getInitials } from "@/lib/utils";
import Heart from "react-heart";
import { useState, useEffect } from "react";

export default function ExpertItem({ expert }) {
  const [isClick, setClick] = useState(expert.heart);
  
    const heartClick = async () => {
      let response;
      setClick(!isClick);
      if (!isClick) {
        response = await axios.patch('/api/professionnels/addSavedProfessionnel', { id: expert.id });
        console.log(response.data);
      } else {
        response = await axios.patch('/api/professionnels/suppSavedProfessionnel', { id: expert.id });
        console.log(response.data);
      }
    };

  return (
    <div className="flex flex-col items-center w-full  mb-2 rounded-lg">
      <div className="flex flex-col sm:flex-row items-center p-2 w-full">
        <div className="flex mr-auto">
          <div className=" mr-4">
            <Avatar size={16}>
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
        <div className=" mb-0 ml-auto sm:ml-0 sm:mb-auto flex gap-4 justify-center items-center">
          <SendInvitation expert={expert} />
          <div className="w-7 h-7">
            <Heart
              onClick={heartClick}
              className="w-full h-full"
              isActive={isClick}
              animationScale={1.25}
              inactiveColor="#ff5400"
              activeColor="#ff5400"
            />
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
