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
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    setWs(ws);
    ws.addEventListener('message', handleSendMessage)
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
  const handleSendMessage = (message) => {
    
    const messageData = JSON.parse(message.data);
    showPeople(messageData.online)

    // message.data.text().then(messageString =>{
    //   console.log(messageString); 
    // });
    //console.log('new message',message);
    // TODO: Implement sending message to server
  };
  const sendMessage = async (message)=>{
    //message.preventDefault();
    console.log(message);
    setMessage(message);
    const newMessage={
    id: id,
    message: {
      type: "text",
      content:message,
    },
    isOwnMessage: true,
  }
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
        if (response.data) {
          const newContact = {
            name: response.data.name.first + ' ' + response.data.name.last,
            //avatarUrl:response.data.photoProfile.url,
          }
          setContact(newContact);
          setName(response.data.name.first);
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
          <MessageList />
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
