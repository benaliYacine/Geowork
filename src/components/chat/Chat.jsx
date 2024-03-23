import React from "react";
import ContactsList from "./ContactsList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

// Example data (replace with actual data fetching from the backend)
const exampleContact = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  lastSeen: "2023-03-15T14:48:00.000Z",
};

export default function Chat() {
  // Placeholder for data fetching and state management

  // Function placeholders for interaction handling
  const handleSendMessage = (message) => {
    console.log(message);
    // TODO: Implement sending message to server
  };

  const handleFileAttach = (files) => {
    console.log(files);
    // TODO: Implement file attachment handling
  };

  return (
    <div className=" h-full flex flex-row w-full gap-5">
      <div className="h-full w-96 flex flex-col overflow-hidden">
        <ContactsList />
      </div>

      <div className=" w-full flex flex-col h-full">
        <div className="flex w-full">
          {" "}
          <ChatHeader
            contactName={exampleContact.name}
            avatarUrl={exampleContact.avatarUrl}
            lastSeen={exampleContact.lastSeen}
          />
        </div>

        <div className=" w-full h-full overflow-y-auto">
          <MessageList />
        </div>
        <div className="flex-none">
          {" "}
          <MessageInput
            onSendMessage={handleSendMessage}
            onFileAttach={handleFileAttach}
          />
        </div>
      </div>
    </div>
  );
};