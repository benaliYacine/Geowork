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

// Determine if the contact is considered "active" based on lastSeen
function isActive(lastSeen) {
  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  // Consider active if last seen is less than 5 minutes ago
  return (now - lastSeenDate) / (1000 * 60) < 5;
}

function ChatHeader({
  contactName = "test",
  avatarUrl = "test",
  lastSeen = "",
}) {
  const contactIsActive = isActive(lastSeen);

  return (
    <div className="border-b-1 w-full">
      <div className="flex items-start p-2">
        <div className="relative mr-4">
          <Avatar>
            <AvatarImage src={avatarUrl} alt={contactName} />
            <AvatarFallback>{contactName.charAt(0)}</AvatarFallback>
          </Avatar>
          {contactIsActive && (
            <span className="absolute bottom-1 right-1 block h-3 w-3 transform translate-x-1/2 translate-y-1/2 bg-green-500 border-2 border-white rounded-full"></span>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold">{contactName}</h2>
          <p className="text-sm text-gray-600">{formatLastSeen(lastSeen)}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;
