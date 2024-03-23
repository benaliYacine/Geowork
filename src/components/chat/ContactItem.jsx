import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ContactItem({
  name = "test best",
  message = "lorem asdfasdh dfgkhj s khgkd g dfkgjh ",
  avatarUrl = "test",
  time = "21 Feb",
}) {
  // Extracting the first few words of the last message
  const previewMessage = `${message.split(" ").slice(0, 5).join(" ")}...`;

  return (
    <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
      <Avatar className="mr-4">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">{name}</h4>
        <p className="text-xs text-gray-500 truncate">{previewMessage}</p>
      </div>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
  );
}

export default ContactItem;
