import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";

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
  const navigate =useNavigate();
  const redirectToMessage=(id)=>{
    console.log(id);
    navigate(`/messages/${id}`);
  }
  contacts=contacts.map((c) => {
    const currentTime = new Date(); // Current date and time
    const messageTime = new Date(c.time); // Time of the message

    let time; // Declare time variable

    // Check if the message is from the current day
    if (currentTime.toDateString() === messageTime.toDateString()) {
      // Format time as "HH:mm"
      time = `${messageTime.getHours()}:${messageTime.getMinutes()}`;
    } else {
      // Format time as "Day Month HH:mm"
      const dayOfMonth = messageTime.getDate();
      const month = messageTime.toLocaleString('default', { month: 'long' });
      time = `${dayOfMonth} ${month}`;
    }

    // Return the modified contact object with formatted time
    return { ...c, time };
  });
  return (
    <ScrollArea className="h-full w-full max-w-xs rounded-2xl bg-white my-3 overflow-y-auto">
      <div className="flex flex-col">
        {contacts.map((contact) => (
          <ContactItem onClick={()=>{redirectToMessage(contact.id)}}
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
