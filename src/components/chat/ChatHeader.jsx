import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming these are correctly imported from your project structure

// Helper function to format the "last seen" message
function formatLastSeen(lastSeen) {
  if (!lastSeen) return "Active Now";

  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const minutesAgo = Math.round((now - lastSeenDate) / (1000 * 60));

  if (minutesAgo < 1) return "Active Now";
  if (minutesAgo < 60) return `Active ${minutesAgo} minutes ago`;
  if (minutesAgo < 1440)
    return `Active ${Math.round(minutesAgo / 60)} hours ago`;

  return `Active on ${lastSeenDate.toLocaleDateString()}`;
}

function ChatHeader({
  contactName = "test",
  avatarUrl = "test",
  lastSeen = "test",
}) {
  return (
    <div className="border-b-2 w-full">
      <div className="flex items-start p-4 ">
        <Avatar className="mr-4">
          <AvatarImage src={avatarUrl} alt={contactName} />
          <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">{contactName}</h2>
          <p className="text-sm text-gray-600">{formatLastSeen(lastSeen)}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
