import React from "react";
import ContactsList from "./ContactsList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";


// Example data (replace with actual data fetching from the backend)
/* const contact = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  lastSeen: "2024-03-23T15:48:00.000Z",
}; */

export default function Chat() {
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({});
  const [contacts, setContacts] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    setWs(ws);

    ws.addEventListener('message', handleSendMessage);


  }, []);
  // Placeholder for data fetching and state management

  const showPeople = async (people) => {
    const response = await axios.post('/contact', { people });

    if (response.data) {
      setContacts(response.data);
      if (id == 1) {
        navigate(`/messages/${response.data[0].id}`);
      }
    }


  }
  // Function placeholders for interaction handling
  const handleSendMessage = (ev) => {

    const messageData = JSON.parse(ev.data);
    console.log("messageData",messageData);
    if ('online' in messageData)
      showPeople(messageData.online);
    

    // message.data.text().then(messageString =>{
    //   console.log(messageString); 
    // });
    //console.log('new message',message);
    // TODO: Implement sending message to server
  };
  const sendMessage = async (message) => {
    console.log(message);
    const time = Date.now()
    let newMessage = {
      id: id, // Assurez-vous d'avoir une variable id définie quelque part
      message: {
        type: "text",
        content: message,
      },
      isOwnMessage: true,

    };

    // Envoi du message au serveur
    const response = await axios.post('/addMessage', newMessage);
    ws.send(JSON.stringify(newMessage))
    // Mise à jour de l'état local pour inclure le nouveau message


    newMessage.timestamp = `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
    console.log("newMessage", newMessage);
    setMessages([...messages, newMessage]);
    const compareDates = (a, b) => {
      if (a.time < b.time) {
        return 1;
      }
      if (a.time >= b.time) {
        return -1;
      }
      return 0;
    };
    const newContact = contacts.filter((contact) => contact.id == id)[0];
    newContact.message = newMessage.message.content;
    newContact.time = newMessage.timestamp;


    setContacts([...contacts.filter((contact) => contact.id !== id), newContact].sort(compareDates));

  }

  const handleFileAttach = (files) => {
    console.log(files);
    // TODO: Implement file attachment handling
  };

  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await axios.get(`/messages/${id}`);
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else
          setLoading(false);
        console.log("response:", response.data);

        if (response.data) {

          const newContact = {
            name: response.data.name.first + ' ' + response.data.name.last,
            //avatarUrl:response.data.photoProfile.url,
          }
          console.log(response.data.contacts);

          const contact = response.data.contacts.filter((contact) => contact.contactId == response.data.user_id)[0];

          console.log(contact);
          let messages = [];
          contact.messages.forEach((m) => {
            messages.push({
              id: m._id,
              senderName: m.senderId == id ? 'Alice' : 'User',
              message: m.message,
              isOwnMessage: m.senderId == id ? false : true,
              timestamp: `${new Date(m.time).getHours()}:${new Date(m.time).getMinutes()}`
            });
          });

          console.log("sdfakjasfd", messages);
          setMessages(messages);
          setContact(newContact);
          /* if (response.data.contacts) {
            const contact = response.data.contacts.contactId.filter((contact) => contact.contactId == response.data.user_id);
            console.log("Contactoooo", contact);
          } else
            console.log("adsfjmadfsk"); */



          //setName(response.data.name.first);
        }

      } catch (error) {
        console.error(error);
        // Handle error here, if needed
      }
    };

    fetchData();
  }, [id, navigate]);
  if (loading) return (<div></div>);
  return (
    <div className=" py-3 h-full flex flex-row w-full gap-5">
      <div className="h-full w-96 flex flex-col overflow-hidden">
        <ContactsList contacts={contacts} />
      </div>

      <div className=" w-full flex flex-col h-full">
        <div className="flex w-full">
          {" "}
          <ChatHeader
            contactName={contact.name}
            avatarUrl={contact.avatarUrl}
            lastSeen={contact.lastSeen}
          />
        </div>

        <div className=" w-full h-full overflow-y-auto">
          <MessageList messages={messages} />
        </div>
        <div className="flex-none">
          {" "}
          <MessageInput
            onSendMessage={sendMessage}
            onFileAttach={handleFileAttach}
          />
        </div>
      </div>
    </div>
  );
}
