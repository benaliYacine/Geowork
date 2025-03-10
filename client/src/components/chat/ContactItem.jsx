import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ContactItem({
  name = "test best",
  message = "lorem asdfasdh dfgkhj s khgkd g dfkgjh ",
  avatarUrl = "test",
  time = "21 Feb",
  isActive = false, // Added isActive prop
  onClick,
}) {
  const previewMessage = message.length > 10 ? `${message.slice(0, 10)}...` : `${message}`;

  return (
      <div
          className="flex items-center p-2 pr-4 hover:bg-gray-100 cursor-pointer"
          onClick={onClick}
      >
          <div className="relative mr-2">
              {/* Make this div relative */}
              <Avatar>
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isActive && ( // Conditionally render the green circle if isActive is true
                  <span className="absolute bottom-[6px] right-[6px] block h-[14px] w-[14px] transform translate-x-1/2 translate-y-1/2 bg-green-500 border-2 border-white rounded-full"></span>
              )}
          </div>
          <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                  {name}
              </h4>
              <p className="text-xs text-gray-500 truncate">{previewMessage}</p>
          </div>
          <span className="text-xs text-gray-400">{time}</span>
      </div>
  );
  
}

export default ContactItem;
