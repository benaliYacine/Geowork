import { React, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageItem from "./MessageItem"; // Import the updated MessageItem component

// Updated sample data with message types
const messages = [
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "budgetEdit",
      from: "DZD  5, 500",
      to: "DZD  6, 500",
      budgetEditState: "waiting",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "budgetEdit",
      from: "DZD  5, 500",
      to: "DZD  6, 500",
      budgetEditState: "waiting",
    },
    timestamp: "10:00 AM",
    isOwnMessage: true,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "budgetEdit",
      from: "DZD  5, 500",
      to: "DZD  6, 500",
      budgetEditState: "accepted",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "budgetEdit",
      from: "DZD  5, 500",
      to: "DZD  6, 500",
      budgetEditState: "accepted",
    },
    timestamp: "10:00 AM",
    isOwnMessage: true,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "budgetEdit",
      from: "DZD  5, 500",
      to: "DZD  6, 500",
      budgetEditState: "denied",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "budgetEdit",
      from: "DZD  5, 500",
      to: "DZD  6, 500",
      budgetEditState: "denied",
    },
    timestamp: "10:00 AM",
    isOwnMessage: true,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "invitation",
      images: ["https://placebear.com/g/200/200"],
      category: "education_and_tutoring",
      subCategory: "math_tutor",
      title: `test test`,
      budget: "DZD  5, 500",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      wilaya: "Algiers",
      city: "Central",
      invitationState: "waiting",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "invitation",
      images: ["https://placebear.com/g/200/200"],
      category: "education_and_tutoring",
      subCategory: "math_tutor",
      title: `test test`,
      budget: "DZD  5, 500",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      wilaya: "Algiers",
      city: "Central",
      invitationState: "waiting",
    },
    timestamp: "10:00 AM",
    isOwnMessage: true,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "invitation",
      images: ["https://placebear.com/g/200/200"],
      category: "education_and_tutoring",
      subCategory: "math_tutor",
      title: `test test`,
      budget: "DZD  5, 500",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      wilaya: "Algiers",
      city: "Central",
      invitationState: "accepted",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "invitation",
      images: ["https://placebear.com/g/200/200"],
      category: "education_and_tutoring",
      subCategory: "math_tutor",
      title: `test test`,
      budget: "DZD  5, 500",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      wilaya: "Algiers",
      city: "Central",
      invitationState: "accepted",
    },
    timestamp: "10:00 AM",
    isOwnMessage: true,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "invitation",
      images: ["https://placebear.com/g/200/200"],
      category: "education_and_tutoring",
      subCategory: "math_tutor",
      title: `test test`,
      budget: "DZD  5, 500",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      wilaya: "Algiers",
      city: "Central",
      invitationState: "denied",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 0,
    senderName: "Alice",
    message: {
      type: "invitation",
      images: ["https://placebear.com/g/200/200"],
      category: "education_and_tutoring",
      subCategory: "math_tutor",
      title: `test test`,
      budget: "DZD  5, 500",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      wilaya: "Algiers",
      city: "Central",
      invitationState: "denied",
    },
    timestamp: "10:00 AM",
    isOwnMessage: true,
  },
  {
    id: 1,
    senderName: "Alice",
    message: {
      type: "text",
      content:
        "Hey, how are you? asDasg g dfgjdf gkd kgjhdfg hdsfgjkh sdfkjg kjdhfgkjhd kjdsf gkjhdf gkj sdfasd asdfa ssdf sdsdf sad sdfasd fsad s adafasdf asdf as dsfg sdf dfgf d sdfg sdf  sdfgsdf  sdfgsdf dfgsdf gsdf sd dfgsdfg  dsfg sdffg  dfg dsf g dfg dfg  dsfg dsf ",
    },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 2,
    senderName: "User",
    message: { type: "text", content: "I'm good, thanks! And you?" },
    timestamp: "10:01 AM",
    isOwnMessage: true,
  },
  {
    id: 3,
    senderName: "Alice",
    message: {
      type: "image",
      url: "https://picsum.photos/536/354",
      content: "Sent an image",
    },
    timestamp: "10:05 AM",
    isOwnMessage: false,
  },
  {
    id: 4,
    senderName: "User",
    message: {
      type: "file",
      url: "https://example.com/file.pdf",
      content: "Sent a file",
    },
    timestamp: "10:07 AM",
    isOwnMessage: true,
  },
  {
    id: 1,
    senderName: "Alice",
    message: { type: "text", content: "Hey, how are you?" },
    timestamp: "10:00 AM",
    isOwnMessage: false,
  },
  {
    id: 2,
    senderName: "User",
    message: { type: "text", content: "I'm good, thanks! And you?" },
    timestamp: "10:01 AM",
    isOwnMessage: true,
  },
  {
    id: 3,
    senderName: "Alice",
    message: {
      type: "image",
      url: "https://picsum.photos/536/354",
      content: "Sent an image",
    },
    timestamp: "10:05 AM",
    isOwnMessage: false,
  },
  {
    id: 4,
    senderName: "User",
    message: {
      type: "file",
      url: "https://example.com/file.pdf",
      content: "Sent a file",
    },
    timestamp: "10:07 AM",
    isOwnMessage: true,
  },
  // Add more messages as needed
].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

// function MessageList({messages}) {
function MessageList() {
  const messagesEndRef = useRef(null);
  // Scroll to the bottom of the messages list every time the messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({});
    }
  }, [messages]);

  return (
    <ScrollArea className=" h-full w-full rounded-lg bg-bg overflow-y-auto">
      <div className=" flex flex-col">
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            senderName={msg.senderName}
            message={msg.message}
            timestamp={msg.timestamp}
            isOwnMessage={msg.isOwnMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Empty div to act as a scroll target */}
    </ScrollArea>
  );
}

export default MessageList;
