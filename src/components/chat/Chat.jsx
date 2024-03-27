import React from "react";
import ContactsList from "./ContactsList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


// Example data (replace with actual data fetching from the backend)
const exampleContact = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  lastSeen: "2024-03-23T15:48:00.000Z",
};

export default function Chat() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const navigate = useNavigate();
  const [ws, setWs] = useState(null);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3000');
    setWs(ws);
    ws.addEventListener('message', handleSendMessage)
  }, []);
  // Placeholder for data fetching and state management

  const showOnlinePeople = async (people) => {
    const response = await axios.post('/contact',{people});
    console.log('afsdasdffadsdfas',response.data);
    if(response.data)
      setContacts(response.data);
    
    
  }
  // Function placeholders for interaction handling
  const handleSendMessage = (message) => {
    const messageData = JSON.parse(message.data);
    console.log(message);
      showOnlinePeople(messageData.online)

    // message.data.text().then(messageString =>{
    //   console.log(messageString); 
    // });
    //console.log('new message',message);
    // TODO: Implement sending message to server
  };

  const handleFileAttach = (files) => {
    console.log(files);
    // TODO: Implement file attachment handling
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/chat');
        console.log(response);
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else
          setLoading(false);
        if (response.data) {
          setName(response.data.name.first);
        }
      } catch (error) {
        console.error(error);
        // Handle error here, if needed
      }
    };

    fetchData();
  }, []);
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
}
