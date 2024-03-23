import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactItem from "./ContactItem";

// Sample data - replace with your actual data source
const contacts = [
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
  },
  {
    id: 1,
    name: "Alice",
    message: "Hey, how are you?",
    avatarUrl: "https://example.com/alice.jpg",
    time: "2:49 PM, Feb 21",
  },
  {
    id: 2,
    name: "Bob",
    message: "Are you coming to the meeting?",
    avatarUrl: "https://example.com/bob.jpg",
    time: "1:15 PM, Feb 20",
  },
  // Add more contacts as needed
].sort((a, b) => new Date(b.time) - new Date(a.time)); // Example sorting, adjust based on your actual date format

function ContactsList() {
  return (
    <ScrollArea className=" h-full w-full max-w-xs rounded-xl border my-3 overflow-y-auto">
      <div className="flex flex-col">
        {contacts.map((contact) => (
          <ContactItem
            key={contact.id}
            name={contact.name}
            message={contact.message}
            avatarUrl={contact.avatarUrl}
            time={contact.time}
          />
        ))}
      </div>
    </ScrollArea>
  );
}

export default ContactsList;
