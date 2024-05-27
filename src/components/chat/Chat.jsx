import React from "react";
import ContactsList from "./ContactsList";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PropagateLoader from "react-spinners/PropagateLoader";

// Example data (replace with actual data fetching from the backend)
/* const contact = {
  name: "John Doe",
  avatarUrl: "https://example.com/avatar.jpg",
  lastSeen: "2024-03-23T15:48:00.000Z",
}; */

export default function Chat() {
    const [loading, setLoading] = useState(true);
    const [contact, setContact] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [refrechContacts, setRefrechContacts] = useState(false);
    const [message, setMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isclient, setIsclient] = useState(true);
    const navigate = useNavigate();
    let peoples = [];
    //const [ws, setWs] = useState(null);
    const [socket, setSocket] = useState(null);
    let { id } = useParams();
    if (!id) id = 1;
    const updateMessage = (message) => {
        message.isOwnMessage = true;
        message.timestamp = `${new Date(Date.now()).getHours()}:${String(new Date(Date.now()).getMinutes()).padStart(2, "0")}`;
        console.log("updateMessage", message);
        setMessages([...messages, message]);
        setMessage({ ...message, id: id });
    };
    useEffect(() => {
        const newSocket = io("ws://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);
    //send Message
    useEffect(() => {
        console.log("message", message);
        if (socket === null) return;
        socket.emit("sendMessage", { ...message });
    }, [message]);

    //receive Message
    useEffect(() => {
        if (socket === null) return;
        // const handleGetUpdateMessage = (res) => {
        //     console.log("responseMessage", res);
        //     if (res.userId !== id) return;
        //     console.log("responseMessage", res);
        //     console.log("messages raham farghin",messages);
        //     const updateMessages = messages.map((m) => {
        //         if (messages.id == res.id) {
        //             m.message.state = res.messageState;
        //         }
        //         return m;
        //     });
        //     setMessages(updateMessages);
        // };

        // socket.on("getUpdateMessage", handleGetUpdateMessage);
        socket.on("getMessage", (res) => {
            //setRefrechContacts(!refrechContacts);
            //setContacts([...contacts]);
            console.log("contacts", contacts);
            /*
      let newContact = contacts.filter((contact) => contact.id == res.id)[0];
      console.log(newContact);
      console.log(res.message.content);
      newContact.message = res.message.content;
      newContact.time = res.timestamp;
      console.log([...contacts.filter((contact) => contact.id !== res.senderId), newContact].sort((a, b) => new Date(b.time) - new Date(a.time)));
      setContacts([...contacts.filter((contact) => contact.id !== res.senderId), newContact].sort((a, b) => new Date(b.time) - new Date(a.time))); */
            if (id !== res.senderId) return;
            res.timestamp = `${new Date(res.timestamp).getHours()}:${new Date(res.timestamp).getMinutes()}`;
            res.id = uuidv4();
            console.log("res", res);
            setMessages((prev) => [...prev, res]);
        });
        return () => {
            socket.off("getMessage");
            socket.off("getUpdateMessage", handleGetUpdateMessage);
        };
    }, [socket, id]);
    // add online users

    /*     useEffect(() => {
        console.log("refrechContacts", contacts);
        console.log(messages[messages.length - 1]);
        let newContact = contacts.filter((contact) => contact.id == messages[messages.length - 1].senderId)[0];
        if(newContact){
        newContact.message = messages[messages.length - 1].message.content;
        //newContact.time = date.now();
        console.log("newContact",newContact)
        console.log("contactssss",[...contacts.filter((contact) => contact.id != messages[messages.length - 1].senderId), newContact].sort((a, b) => new Date(b.time) - new Date(a.time)))
        setContacts([...contacts.filter((contact) => contact.id !== messages[messages.length - 1].senderId), newContact].sort((a, b) => new Date(b.time) - new Date(a.time)));
        }
      }, [refrechContacts])
   */

    // Placeholder for data fetching and state management

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/messages/${id}`);
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                } else setLoading(false);

                if (response.data) {
                    const newContact = {
                        name:
                            response.data.name.first +
                            " " +
                            response.data.name.last,
                        //avatarUrl:response.data.photoProfile.url,
                    };
                    console.log("les messages", response.data);
                    let contact = response.data.contacts.filter(
                        (contact) => contact.contactId == response.data.user_id
                    )[0];

                    let messages = [];
                    contact.messages.forEach((m) => {
                        console.log("mmm", m);
                        m.message.forEach((ms) => {
                            console.log();
                            let InPrBd =
                                ms.message.type == "invitation" ||
                                ms.message.type == "proposal" ||
                                ms.message.type == "budgetEdit"
                                    ? {
                                          ...ms.message.jobId,
                                      }
                                    : null;
                            if (InPrBd) {
                                InPrBd.jobId = InPrBd._id;
                                delete InPrBd._id;
                                delete InPrBd.hires;
                                delete InPrBd.proposals;
                                if (InPrBd.images)
                                    InPrBd.images = InPrBd.images.map(
                                        (i) => i.url
                                    );
                            }

                            delete ms.message.jobId;
                            messages.push({
                                id: ms._id,
                                senderName:
                                    ms.senderId == id ? "Alice" : "User",
                                message: { ...InPrBd, ...ms.message },
                                isOwnMessage: ms.senderId == id ? false : true,
                                timestamp: `${new Date(ms.time).getHours()}:${new Date(ms.time).getMinutes()}`,
                            });
                        });
                    });
                    console.log("yaww messages", messages);

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

    useEffect(() => {
        if (socket === null) return;
        socket.emit("addNewUser");
        socket.on("getOnlineUsers", (res) => {
            showPeople(res);
        });
        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket]);

    const showPeople = async (people) => {
        const response = await axios.post("/contact", { people });
        console.log("rani hna");
        console.log(response.data);
        if (response.data) {
            peoples = response.data;
            setContacts(response.data);
            if (id == 1) {
                navigate(`/messages/${response.data[0].id}`);
            }
        }
    };
    // Function placeholders for interaction handling

    const sendMessage = async (message) => {
        console.log(message);
        let newMessage = {
            id: id, // Assurez-vous d'avoir une variable id définie quelque part
            message: {
                type: "text",
                content: message,
            },
            isOwnMessage: true,
        };

        // Envoi du message au serveur
        const response = await axios.post("/addMessage", newMessage);

        // Mise à jour de l'état local pour inclure le nouveau message
        const time = Date.now();
        newMessage.timestamp =
            time; /* `${new Date(time).getHours()}:${new Date(time).getMinutes()}` */

        const newContact = contacts.filter((contact) => contact.id == id)[0];
        newContact.message = newMessage.message.content;
        newContact.time = newMessage.timestamp;
        console.log("yawContact", contacts);

        setContacts(
            [
                ...contacts.filter((contact) => contact.id !== id),
                newContact,
            ].sort((a, b) => new Date(b.time) - new Date(a.time))
        );
        newMessage.timestamp = `${new Date(time).getHours()}:${new Date(time).getMinutes()}`;
        setMessage(newMessage);
        let Nmessage = { ...newMessage };
        Nmessage.id = uuidv4();
        console.log();
        setMessages([...messages, Nmessage]);
        console.log("yawContact", contacts);
    };

    const handleFileAttach = async (files) => {
        const formData = new FormData();
        console.log("files", files);
        console.log("formData", formData);

        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
            formData.append("type", "image");
        }
        formData.append("id", id);

        console.log("formData", formData);
        const response = await axios.post("/addMessageFile", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        let newMessage = {
            id: id, // Assurez-vous d'avoir une variable id définie quelque part
            message: {
                type: "image",
                content: "Sent an image",
                url: response.data.message.url,
            },
            isOwnMessage: true,
        };
        console.log("newMessage", newMessage);
        setMessage(newMessage);
        setMessages([...messages, newMessage]);

        // TODO: Implement file attachment handling
    };

    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );

    // return contacts.length != 0 ? (
    return true ? (
        <div className="flex-grow h-full flex w-full gap-1 px-6 py-2 overflow-hidden">
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

                <div className=" w-full h-full flex-grow overflow-y-auto">
                    <MessageList
                        messages={messages}
                        updateMessage={updateMessage}
                        socket={socket}
                    />
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
    ) : isclient ? (
        <main className="flex flex-grow items-center justify-center bg-bg px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {" "}
                <p className=" text-3xl font-bold font-header tracking-tight text-foreground sm:text-5xl">
                    You don't have any contacts yet.
                </p>{" "}
                <p className="mt-6 text-base leading-7 text-greyDark">
                    Start by posting a job and inviting geoworkers to
                    collaborate!
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <Link to="/jobslides" className="">
                        <Button variant="default" size="">
                            Post job
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    ) : (
        <main className="flex  flex-grow items-center justify-center bg-bg px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                {" "}
                <p className=" text-3xl font-bold font-header tracking-tight text-foreground sm:text-5xl">
                    You don't have any contacts yet.
                </p>{" "}
                <p className="mt-6 leading-7 text-greyDark text-lg">
                    Start by looking for jobs and sending proposals to connect
                    with clients!
                </p>
                <div className="mt-6 flex items-center justify-center gap-x-6">
                    <Link to="/findWork" className="">
                        <Button variant="default" size="">
                            Find Work
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
