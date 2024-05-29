import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import io from "socket.io-client";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ComboBoxComponentWithId from "@/components/formFields/ComboBoxComponentWithId";
import AlertMessage from "@/components/common/AlertMessage";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
// Define your form schema
const formSchema = z.object({
    invitationMessage: z
        .string()
        .min(10, {
            message: "Your invitation message must be at least 10 characters.",
        })
        .max(3000, {
            message:
                "Your invitation message must not be longer than 3000 characters.",
        }),
    job: z.string({ required_error: "Please select a job." }),
});

import IconButton from "@/components/common/IconButton";
import TextareaFormField from "@/components/formFields/TextareaFormField";

import { Pencil } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Content } from "@radix-ui/react-accordion";

function SendInvitation({ name = "Yacine", expert }) {
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [jobNotSpecified, setJobNotSpecified] = useState(true);
    const [invitation, setInvitation] = useState();
    const [clientJobs, setClientJobs] = useState(undefined);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/client");
            if (response.data) {
                console.log(response.data);
                let jobs = response.data.map((j) => ({
                    label: j.title,
                    value: j._id,
                }));
                console.log(jobs);
                setClientJobs(jobs);
            }
        };
        fetchData();
    }, []);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            invitationMessage: `Hello! \n\n I'd like to invite you to take a look at the job I've posted. \n\n ${name}.`,
            job: clientJobs && clientJobs[0].label,
        },
    });
    const onSubmit = async (values) => {
        console.log(values);
        const Invitation1 = {
            id: expert.id,
            message: {
                jobId: values.job,
                type: "invitation",
                state: "waiting",
                content: "Invitation Message",
            },
        };
        const response1 = await axios.post("/addMessage", Invitation1);
        if (response1.data) {
            console.log("response1.data", response1.data);
            if (response1.data.message) {
                setAlertMessage(response1.data.message);
                setShowAlert(true);
                setDialogOpen(false);
                return;
            }
        }
        Invitation1.timestamp = `${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`;
        console.log("hna pro");
        Invitation1.messageId = response1.data._id;
         console.log("hna pro");
        setInvitation(Invitation1);
         console.log("hna pro");
        console.log("response1", response1);
         console.log("hna pro");
        /* const Invitation2 = {
        id: expert.id,
        message: { type: "text", content: values.invitationMessage },
    };
    const response2=await axios.post('/addMessage',Invitation2);
    console.log("response2.data", response2.data); */
        // TODO: handle send invitation message
        setDialogOpen(false);
    };
    useEffect(() => {
        const newSocket = io("ws://localhost:3000");
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);
    useEffect(() => {
        console.log("message", invitation);
        if (socket === null) return;
        socket.emit("sendMessage", { ...invitation });
    }, [invitation]);

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AlertMessage
                showAlert={showAlert}
                variant="destructive"
                onClose={() => setShowAlert(false)}
                message={alertMessage}
            />
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Invite to Job
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-2"
                        >
                            {/* invitationMessage */}
                            <DialogHeader>
                                <DialogTitle className="font-header font-bold p-0 text-2xl">
                                    Invite To Job
                                </DialogTitle>
                                <DialogDescription>
                                    {/* Make changes to your profile here. Click save when you're done. */}
                                </DialogDescription>
                            </DialogHeader>
                            {/* the expert info  jebtha men expert item w na7iit l separator l rating l location ..div w styles manehtajhoumch ...*/}
                            <div className="flex flex-row p-2 w-full mr-auto">
                                <Avatar className="mr-2">
                                    <AvatarImage
                                        src={expert.avatarUrl}
                                        alt={expert.name}
                                    />
                                    <AvatarFallback>
                                        {expert.initials}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <h3 className="text-lg font-semibold mb-1">
                                        {expert.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-1">
                                        {expert.role}
                                    </p>
                                </div>
                            </div>

                            <TextareaFormField
                                control={form.control}
                                name="invitationMessage"
                                label="Message *"
                                placeholder="Already have a message? Paste it here!"
                                height="180px"
                            />

                            {jobNotSpecified && (
                                <ComboBoxComponentWithId
                                    control={form.control}
                                    name="job"
                                    label="Choose one of your job posts"
                                    itemList={clientJobs}
                                    placeholder="Select a job"
                                />
                            )}
                            {/* Submit Button */}
                            <DialogFooter>
                                <DialogClose>
                                    <Button
                                        variant="outline"
                                        className="mt-3"
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button className="mt-3" type="submit">
                                    Send invitaion
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SendInvitation;
