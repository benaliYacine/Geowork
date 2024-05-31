import { React, useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming these are correctly imported from your project structure
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import EditBudgetButton from "@/components/chat/EditBudgetButton";
import { getInitials } from "@/lib/utils";
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

    return `Active 12 minutes ago`;
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
    contactName = "Bouazziz Ilyes",
    avatarUrl = "test",
    contacts = [],
    lastSeen="Offline"
}) {
  console.log("contacts",contacts);
    const { id } = useParams();
    //const [lastSeen, setLastSeen] = useState();
    
    // useEffect(
    //     setLastSeen(
    //         contacts.filter((c) => c.id== id)[0].isActive
    //             ? "Active Now"
    //             : "Offline"
    //     ),
    //     []
    // );

    const contactIsActive = lastSeen == "Active Now";
    if (contactName == "") return <div></div>;
    return (
        <div className="border-b-1 w-full flex justify-between items-center">
            <div className="flex items-start p-2">
                <div className="relative mr-4">
                    <Avatar className="w-12">
                        <AvatarImage src={avatarUrl} alt={contactName} />
                        <AvatarFallback>
                            {getInitials(contactName)}
                        </AvatarFallback>
                    </Avatar>
                    {contactIsActive && (
                        <span className="absolute bottom-[6px] right-[6px] block h-[14px] w-[14px] transform translate-x-1/2 translate-y-1/2 bg-green-500 border-2 border-white rounded-full"></span>
                    )}
                </div>

                <div>
                    <h2 className="text-lg font-semibold">{contactName}</h2>
                    <p className="text-sm text-gray-600">{lastSeen}</p>
                </div>
            </div>
            {/* <EditBudgetButton
        budget=""
      /> */}
        </div>
    );
}

export default ChatHeader;
