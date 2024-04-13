import React from "react";
import { CircleUser, MessageCircle, Settings, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BellRing } from "lucide-react";
export default function NotificationIcon() {
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <BellRing className="h-6 w-6 stroke-current stroke-[1.5px] text-black cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col gap-2 items-start justify-center w-fit">
        
        <NotificationListItem text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />  
        <NotificationListItem text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
        <NotificationListItem text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
        <NotificationListItem text="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
      </PopoverContent>
    </Popover>
  );
}


const NotificationListItem = ({ text }) => {
  return (
    <div className="flex items-center p-1.5 hover:bg-bg w-80  rounded-md">
      <div className="text-xs text-gray-600 truncate w-full">{text}</div>
    </div>
  );
};
