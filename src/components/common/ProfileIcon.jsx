import React from "react";
import { CircleUser, MessageCircle, Settings, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function ProfileIcon({ pro = true, name = "test test" }) {
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <CircleUser className="h-6 w-6 stroke-current stroke-[1.5px] text-black cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="p-2 flex flex-col gap-2 items-start justify-center w-fit">
        <div className="w-40 flex justify-center flex-col items-center gap-2">
          {pro ? (
            <img src="" alt="" className="h-16 w-16 rounded-full bg-bg" />
          ) : (
            <CircleUser className="h-16 w-16 stroke-current stroke-[1px] text-black cursor-pointer" />
          )}
          <span className=" text-xl text-black font-bold ">{name}</span>
        </div>
        {pro && <ListItemWithIcon Icon={CircleUser} text="profile" />}
        <ListItemWithIcon Icon={MessageCircle} text="messages" />
        <ListItemWithIcon Icon={Settings} text="settings" link="/settings"/>
        <ListItemWithIcon Icon={LogOut} text="log out" />
      </PopoverContent>
    </Popover>
  );
}

import { Link } from "react-router-dom";

const ListItemWithIcon = ({ Icon, text, link }) => {
  return (
    <Link to={link} className="text-white">
      <div className="flex items-center gap-2 p-2 hover:bg-bg w-40 cursor-pointer rounded-md">
        <Icon className="h-6 w-6 stroke-[1px] text-black" />
        <span className=" text-sm text-black">{text}</span>
      </div>
    </Link>
  );
};
