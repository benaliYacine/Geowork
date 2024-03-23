import React from "react";

function MessageItem({ senderName, message, timestamp, isOwnMessage }) {
  // Helper function to render the message content based on its type
  const renderMessageContent = (message) => {
    switch (message.type) {
      case "text":
        return <p className="text-sm">{message.content}</p>;
      case "image":
        return (
          <img
            src={message.url}
            alt="Sent image"
            className="max-w-xs md:max-w-md rounded-lg"
          />
        );
      case "file":
        return (
          <a
            href={message.url}
            download
            className="text-sm text-blue-500 underline"
          >
            {message.content}
          </a>
        );
      default:
        return <p className="text-sm">Unsupported message type</p>;
    }
  };

  return (
    <div
      className={`flex ${
        isOwnMessage ? "flex-row-reverse" : ""
      } mb-2 items-end`}
    >
      <div
        className={`px-4 py-2 my-1 mx-2  ${
          isOwnMessage ? "bg-orange-100 rounded-s-lg rounded-t-lg" : "bg-gray-100 rounded-e-lg rounded-t-lg"
        }`}
      >
        {renderMessageContent(message)}
      </div>
      <span className="text-xs text-gray-500">{timestamp}</span>
    </div>
  );
}

export default MessageItem;

// Here's a breakdown of the component:

// Props:
// senderName: The name of the sender. This could be omitted or null for messages sent by the user themselves.
// message: The text content of the message.
// timestamp: When the message was sent. You can format this timestamp according to your preferences before passing it to the component.
// isOwnMessage: A boolean indicating whether the message was sent by the user. This affects the alignment and background color to differentiate between incoming and outgoing messages.
// Styling:
// The component uses Tailwind CSS classes for styling. Messages sent by the user (isOwnMessage is true) are aligned to the end and have a different background color (bg-blue-100) compared to messages from others (bg-gray-100).
// The max-w-xs md:max-w-md classes limit the width of the messages, making them more readable and ensuring they don't stretch across the entire container on larger screens.
// The rounded-lg class adds rounded corners to the message bubble.
