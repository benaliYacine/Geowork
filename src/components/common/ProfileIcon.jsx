import React from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CircleUser, MessageCircle, Settings, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverArrow,
} from "@/components/ui/popover";

export default function ProfileIcon({ pro = true, name = "test test", photoProfile = null }) {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    console.log('fdsajhdfas');
    const response = await axios.post('/logout');
    if (response.data.redirectUrl) {
      navigate(response.data.redirectUrl);
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        {" "}
        <CircleUser className="h-8 w-8 stroke-current stroke-[1.2px] text-black cursor-pointer transition-translate duration-200 ease-in-out hover:opacity-80" />
      </PopoverTrigger>
      <PopoverContent className="p-2 mx-4 flex flex-col gap-2 items-start justify-center w-fit">
        <div className="w-40 flex justify-center flex-col items-center gap-2">
          {pro && photoProfile != "" ? (
            <img
              src={photoProfile}
              alt=""
              className="h-16 w-16 rounded-full bg-bg"
            />
          ) : (
            <CircleUser className="h-16 w-16 stroke-current stroke-[1px] text-black cursor-pointer" />
          )}
          <span className=" text-xl text-black font-bold ">{name}</span>
        </div>
        {pro && (
          <ListItemWithIcon
            Icon={CircleUser}
            text="profile"
            link="/dashboard"
          />
        )}
        <ListItemWithIcon
          Icon={MessageCircle}
          text="messages"
          link="/messages"
        />
        <ListItemWithIcon Icon={Settings} text="settings" link="/settings" />
        <ListItemWithIcon
          Icon={LogOut}
          text="log out"
          onClick={() => handleLogOut()}
        />
        <PopoverArrow className="fill-white relative top-[-1px] scale-150" />
      </PopoverContent>
    </Popover>
  );
}

import { Link } from "react-router-dom";

const ListItemWithIcon = ({ Icon, text, link,onClick }) => {
  return (
    <Link to={link} className="text-white">
      <div onClick={onClick} className="flex items-center gap-2 p-2 hover:bg-bg w-40 cursor-pointer rounded-md">
        <Icon className="h-6 w-6 stroke-[1px] text-black" />
        <span className=" text-sm text-black">{text}</span>
      </div>
    </Link>
  );
};
