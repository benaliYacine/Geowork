import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactItem from "./ContactItem";

//Updated sample data with isActive property
const contacts = [
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
    isActive: true, // Alice is active
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
    isActive: false, // Bob is not active
  },
].sort((a, b) => new Date(b.time) - new Date(a.time)); // Sorting based on time

function ContactsList({contacts=[]}) {
  return (
    <ScrollArea className="h-full w-full max-w-xs rounded-xl bg-white my-3 overflow-y-auto">
      <div className="flex flex-col">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            name={contact.name}
            message={contact.message}
            avatarUrl={contact.avatarUrl}
            time={contact.time}
            isActive={contact.isActive}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

export default ContactsList;
