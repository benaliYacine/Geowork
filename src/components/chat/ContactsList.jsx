import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ContactItem from "./ContactItem";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
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

function ContactsList({ contacts = [] }) {
  const navigate = useNavigate();
  const [isclient, setIsclient] = useState(false);
  const redirectToMessage = (id) => {
    console.log(id);
    navigate(`/messages/${id}`);
  };
  contacts = contacts.map((c) => {
    const currentTime = new Date(); // Date et heure actuelles
    const messageTime = new Date(c.time); // Heure du message

    let time; // Déclarer la variable de temps

    // Vérifier si le message est de la journée actuelle
    if (currentTime.toDateString() === messageTime.toDateString()) {
      // Si le message a été envoyé aujourd'hui, afficher l'heure et les minutes
      time = messageTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // Si le message n'a pas été envoyé aujourd'hui, afficher la date
      time = messageTime.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    // Retourner l'objet de contact modifié avec le temps formaté
    return { ...c, time };
  });

  return (
    <ScrollArea className="h-full w-full max-w-xs rounded-2xl bg-white my-3 overflow-y-auto">
      <div className="flex flex-col">
        {contacts.length != 0 ? (
          contacts.map((contact) => (
            <ContactItem
              onClick={() => {
                redirectToMessage(contact.id);
              }}
              key={contact.id}
              name={contact.name}
              message={contact.message}
              avatarUrl={contact.avatarUrl}
              time={contact.time}
              isActive={contact.isActive}
            />
          ))
        ) : isclient ? (
          <div className="w-full flex flex-col justify-center items-center py-8 gap-2 px-2">
            {" "}
            <p className="h-full w-full text-center text-slate-300 font-semibold">
              <span className=" text-black text-md">
                You don't have any contacts yet.
              </span>{" "}
              <span className="text-sm">
                Start by posting a job and inviting experts to collaborate!
              </span>{" "}
            </p>
            <Link to="/jobslides" className="text-white">
              <Button variant="default" size="sm">
                Post job
              </Button>
            </Link>
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center py-8 gap-2 px-2">
            {" "}
            <p className="h-full w-full text-center  text-slate-300 font-semibold">
              <span className=" text-black text-md">
                You don't have any contacts yet.
              </span>{" "}
              <span className="text-sm">
                Start by looking for jobs and sending proposals to connect with
                clients!
              </span>
            </p>
            <Link to="/findWork" className="text-white">
              <Button variant="default" size="sm">
                Find Work
              </Button>
            </Link>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}

export default ContactsList;
