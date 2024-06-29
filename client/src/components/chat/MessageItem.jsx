import { React, useState, useEffect } from "react";
import Location from "@/components/common/Location";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Category from "@/components/common/Category";
import Heart from "react-heart";
import { File, Check } from "lucide-react";
import AlertDialog from "@/components/common/AlertDialog";
import CloseJobDialog from "@/components/chat/CloseJobDialog";
import LeaveFeedback from "@/components/chat/LeaveFeedback";
import ReportComplete from "@/components/chat/ReportComplete";
import EditBudgetButton from "@/components/chat/EditBudgetButton";
import SendLocation from "@/components/chat/Map/SendLocation";
import GetLocation from "@/components/chat/Map/GetLocation";
import EditLocation from "@/components/chat/Map/EditLocation";
import ImageDrawer from "@/components/chat/ImageDrawer";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";
import { IdentificationIcon } from "@heroicons/react/24/outline";

function MessageItem({
    senderName,
    message,
    timestamp,
    isOwnMessage,
    key,
    id,
    updateMessage,
}) {
    // const [socket, setSocket] = useState(null);
    const navigate = useNavigate();
    let proId = useParams().id;
    const [Message, setMessage] = useState(message);
    const [messageState, setMessageState] = useState(Message.state);
    const [rerender, setRerender] = useState(false);
    //     useEffect(() => {
    //         const newSocket = io("ws://localhost:3000");
    //         setSocket(newSocket);

    //         return () => {
    //             newSocket.disconnect();
    //         };
    //     }, []);

    //     useEffect(() => {
    //         if (!socket) return;

    //         socket.emit("updateMessage", { userId: proId, id, messageState });
    //     }, [messageState]);

    // useEffect(() => {
    //     if (!socket) return;

    //     const handleGetUpdateMessage = (res) => {
    //         console.log("Received updated message from server:", res);
    //         if (id.toString() !== res.id.toString()) return;
    //         if (proId.toString() !== res.userId.toString()) return;
    //         setMessageState(res.messageState);
    //     };

    //     socket.on("getUpdateMessage", handleGetUpdateMessage);

    //     return () => {
    //         socket.off("getUpdateMessage", handleGetUpdateMessage);
    //     };
    // }, [socket, id, proId]);

    const withrawProposal = async () => {
        const response = await axios.patch("withrawProposal", { id });
        setMessageState("withdrawn");
        console.log("Proposalwithdrawn", response.data);
    };
    const acceptInvitation = async () => {
        const response = await axios.patch("/api/jobs/addProfessionnelToJob", {
            jobId: Message.jobId,
            id,
        });
        console.log("acceptInvitation", response.data);
        setMessageState("accepted");
    };
    const acceptProposal = async () => {
        const response = await axios.patch("/api/jobs/addProfessionnelToJob", {
            jobId: Message.jobId,
            id,
            proId,
        });
        console.log("acceptProposal", response.data);
        setMessageState("accepted");
    };
    const acceptBudgetEdit = async () => {
        const response = await axios.patch("/acceptBudgetEdit", {
            jobId: Message.jobId,
            id,
            proId,
        });
        console.log("acceptBudgetEdit", response.data);
        setMessageState("accepted");
    };
    const denyBudgetEdit = async () => {
        const response = await axios.patch("/denyBudgetEdit", { id });
        console.log("denyBudgetEdit", response.data);
        setMessageState("denied");
    };
    const denyProposal = async () => {
        const response = await axios.patch("/denyProposal", {
            id,
        });
        console.log("denyProposal", response.data);
        setMessageState("denied");
    };
    const denyInvitation = async () => {
        const response = await axios.patch("/denyInvitation", { id });
        console.log("denyInvitation", response.data);
        setMessageState("denied");
    };
    const cancelInvitation = async () => {
        const response = await axios.patch("/cancelInvitation", { id });
        console.log("cancelInvitation", response.data);
        setMessageState("withdrawn");
    };
    const cancelBudgetEdit = async () => {
        const response = await axios.patch("/cancelBudgetEdit", { id });
        console.log("cancelBudgetEdit", response.data);
        setMessageState("withdrawn");
    };
    const editLocation = async (location) => {
        const response = await axios.patch("/editLocation", { id, location });
        console.log("editLocation", response.data);
        setMessage({ ...response.data.message });
    };
    const leaveFeedback = async (values) => {
        const response = await axios.patch("/leaveFeedback", {
            ...values,
            id,
            jobId: Message.jobId,
        });
        setMessageState("feedback");
        console.log("leaveFeedback", response.data);
    };

    function budgetRenderFootereRecieved(isClient) {
        switch (messageState) {
            case "waiting":
                return (
                    <div className="flex justify-end w-full gap-2">
                        <AlertDialog
                            title="deny budget edit suggestion"
                            description="Are you sure you want to deny this budget edit suggestion"
                            action={denyBudgetEdit}
                            actionButtonText="deny"
                        >
                            <Button variant="outline" size="sm">
                                Deny
                            </Button>
                        </AlertDialog>

                        <AlertDialog
                            title="Accept budget edit suggestion"
                            description="Are you sure you want to accept this budget edit suggestion"
                            action={acceptBudgetEdit}
                            actionButtonText="Accept"
                        >
                            <Button size="sm">Accept</Button>
                        </AlertDialog>
                    </div>
                );
            case "accepted":
                return (
                    <p className=" text-md text-success w-full">
                        you have accepted this budget edit suggestion
                    </p>
                );
            case "taken":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            {isClient ? (
                                <p className=" text-md text-success w-full">
                                    you have chosen another geoworker to do the
                                    job
                                </p>
                            ) : (
                                <p className=" text-md text-destructive w-full">
                                    The client has chosen another geoworker to
                                    do the job
                                </p>
                            )}
                        </p>
                    </div>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have denied this budget edit suggestion
                    </p>
                );
            case "withdrawn":
                return (
                    <p className=" text-md text-destructive w-full">
                        {isClient ? "The geoworker" : "The Client"} has
                        withdrawn his budget edit suggestion
                    </p>
                );

            default:
                return null;
        }
    }
    function budgetRenderFootereSent(isClient) {
        switch (messageState) {
            case "waiting":
                return (
                    <div className="flex justify-end w-full gap-2">
                        <AlertDialog
                            title="cancel budget edit suggestion"
                            description="Are you sure you want to cancel this budget edit suggestion"
                            action={cancelBudgetEdit}
                            actionButtonText="yes"
                        >
                            <Button variant="outline" size="sm">
                                Cancel
                            </Button>
                        </AlertDialog>
                    </div>
                );
            case "accepted":
                return (
                    <p className=" text-md text-success w-full">
                        {isClient ? "The geoworker" : "The Client"} has accepted
                        your budget edit suggestion
                    </p>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        {isClient ? "The geoworker" : "The Client"} has denied
                        your budget edit suggestion
                    </p>
                );
            case "taken":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            {isClient ? (
                                <p className=" text-md text-success w-full">
                                    you have chosen another geoworker to do the
                                    job
                                </p>
                            ) : (
                                <p className=" text-md text-destructive w-full">
                                    The client has chosen another geoworker to
                                    do the job
                                </p>
                            )}
                        </p>
                    </div>
                );
            case "withdrawn":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have withdrawn this buget edit suggestion
                    </p>
                );

            default:
                return null;
        }
    }
    function proposalRenderFootereRecieved() {
        switch (messageState) {
            case "waiting":
                return (
                    <div className="flex justify-end w-full gap-2">
                        <EditBudgetButton
                            updateMessage={updateMessage}
                            jobId={Message.jobId}
                            budget={Message.budget}
                        />
                        <AlertDialog
                            title="deny proposal"
                            description="Are you sure you want to deny this proposal"
                            action={denyProposal}
                            actionButtonText="deny"
                        >
                            <Button variant="primary2" size="sm">
                                deny
                            </Button>
                        </AlertDialog>
                        <AlertDialog
                            title="Hire geoworker"
                            description="Are you sure you want to Hire this geoworker"
                            action={acceptProposal}
                            actionButtonText="Hire"
                        >
                            <Button size="sm">Hire</Button>
                        </AlertDialog>
                    </div>
                );
            case "accepted":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have hired this geoworker.
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <CloseJobDialog
                                setMessageState={setMessageState}
                                id={id}
                                jobId={Message.jobId}
                            />
                            <SendLocation updateMessage={updateMessage} />
                        </div>
                    </div>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have denied this proposal
                    </p>
                );
            case "closed":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have closed this job.
                        </p>
                    </div>
                );
            case "taken":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have chosen another geoworker to do the job
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <AlertDialog
                                title="Close Proposal"
                                description="Are you sure you want to Close this Proposal"
                                // action={withrawProposal}
                                actionButtonText="close"
                            >
                                <Button
                                    onClick={withrawProposal}
                                    variant="outline"
                                    size="sm"
                                >
                                    {/* Cancel  */}
                                    Close Proposal
                                </Button>
                            </AlertDialog>
                        </div>
                    </div>
                );
            case "feedback":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have closed this job. and the expert has leaved
                            a feedback for you.
                        </p>
                    </div>
                );
            case "canceled":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-destructive w-full">
                            you have canceled this job.
                        </p>
                    </div>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have denied this proposal
                    </p>
                );
            case "withdrawn":
                return (
                    <p className=" text-md text-destructive w-full">
                        the geoworker has withdrawn his proposal
                    </p>
                );

            default:
                return null;
        }
    }
    function proposalRenderFooterSent() {
        switch (messageState) {
            case "waiting":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-warningDark w-full">
                            no reply yet
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <AlertDialog
                                title="Withraw Proposal"
                                description="Are you sure you want to Withraw your Proposal"
                                action={withrawProposal}
                                actionButtonText="Withraw"
                            >
                                <Button
                                    onClick={withrawProposal}
                                    variant="outline"
                                    size="sm"
                                >
                                    {/* Cancel  */}
                                    Withraw Proposal
                                </Button>
                            </AlertDialog>

                            <Button
                                size="sm"
                                onClick={() => {
                                    navigate(`/expertProposalPage/${id}`);
                                }}
                            >
                                Edit
                            </Button>
                        </div>
                    </div>
                );
            case "accepted":
                return (
                    <p className=" text-md text-success w-full">
                        the client has hired you
                        {/* ask him to share the exact job location with you so you can... */}
                    </p>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        The client has denied your proposal
                    </p>
                );
            case "closed":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-success w-full">
                            the client has closed the job
                            {/* ask him to share the exact job location with you so you can... */}
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <LeaveFeedback leaveFeedback={leaveFeedback} />
                        </div>
                    </>
                );
            case "taken":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-destructive w-full">
                            The client has chosen another geoworker to do the
                            job
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <AlertDialog
                                title="Withraw Proposal"
                                description="Are you sure you want to Withraw your Proposal"
                                // action={withrawProposal}
                                actionButtonText="Withraw"
                            >
                                <Button
                                    onClick={withrawProposal}
                                    variant="outline"
                                    size="sm"
                                >
                                    {/* Cancel  */}
                                    Withraw Proposal
                                </Button>
                            </AlertDialog>
                        </div>
                    </div>
                );
            case "feedback":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-success w-full">
                            the client has closed the job
                        </p>
                        <p className=" text-md text-success w-full">
                            <Check className="inline mr-2" />
                            your feedback was submitted successfully
                        </p>
                    </>
                );
            case "canceled":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-destructive w-full">
                            the client has canceled the job
                            {/* ask him to share the exact job location with you so you can... */}
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <ReportComplete />
                        </div>
                    </>
                );
            case "reported":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-success w-full">
                            You have reported the job as completed. We will
                            review the images and update the job status
                            accordingly
                            {/* ask him to share the exact job location with you so you can... */}
                        </p>
                    </>
                );
            case "withdrawn":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have withdrawn your proposal
                    </p>
                );

            default:
                return null;
        }
    }
    function invitationRenderFooterRecieved() {
        switch (messageState) {
            case "waiting":
                return (
                    <div className="flex justify-end w-full gap-2">
                        <EditBudgetButton
                            updateMessage={updateMessage}
                            jobId={Message.jobId}
                            budget={Message.budget}
                        />
                        <AlertDialog
                            title="deny invitation"
                            description="Are you sure you want to deny this job invitation"
                            action={denyInvitation}
                            actionButtonText="deny"
                        >
                            <Button variant="primary2" size="sm">
                                Deny
                            </Button>
                        </AlertDialog>
                        <AlertDialog
                            title="accept invitation"
                            description="Are you sure you want to accept this job invitation"
                            action={acceptInvitation}
                            actionButtonText="accept"
                        >
                            <Button size="sm">Accept</Button>
                        </AlertDialog>
                    </div>
                );
            case "accepted":
                return (
                    <p className=" text-md text-success w-full">
                        you have accepted this job invitation. now, ask the
                        client to share the exact job location with you
                    </p>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have denied this job invitation
                    </p>
                );
            case "closed":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-success w-full">
                            the client has closed the job
                            {/* ask him to share the exact job location with you so you can... */}
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <LeaveFeedback leaveFeedback={leaveFeedback} />
                        </div>
                    </>
                );
            case "taken":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-destructive w-full">
                            The client has chosen another geoworker to do the
                            job
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <AlertDialog
                                title="close invitation"
                                description="Are you sure you want to close this job invitation"
                                // action={cancelInvitation}
                                actionButtonText="Yes"
                            >
                                <Button
                                    onClick={cancelInvitation}
                                    variant="outline"
                                    size="sm"
                                >
                                    close Invitation
                                </Button>
                            </AlertDialog>
                        </div>
                    </div>
                );
            case "feedback":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-success w-full">
                            the client has closed the job
                        </p>
                        <p className=" text-md text-success w-full">
                            <Check className="inline mr-2" />
                            your feedback was submitted successfully
                        </p>
                    </>
                );
            case "canceled":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-destructive w-full">
                            the client has canceled the job
                            {/* ask him to share the exact job location with you so you can... */}
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <ReportComplete />
                        </div>
                    </>
                );
            case "withdrawn":
                return (
                    <p className=" text-md text-destructive w-full">
                        the client has withdrawn his invitation
                    </p>
                );
            case "reported":
                return (
                    <>
                        {" "}
                        <p className=" text-md text-success w-full">
                            You have reported the job as completed. We will
                            review the images and update the job status
                            accordingly
                            {/* ask him to share the exact job location with you so you can... */}
                        </p>
                    </>
                );

            default:
                return null;
        }
    }
    function invitationRenderFooterSent() {
        switch (messageState) {
            case "waiting":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-warningDark w-full">
                            no reply yet
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <AlertDialog
                                title="cancel invitation"
                                description="Are you sure you want to cancel your job invitation"
                                action={cancelInvitation}
                                actionButtonText="Yes"
                            >
                                <Button variant="outline" size="sm">
                                    Cancel Invitation
                                </Button>
                            </AlertDialog>
                        </div>
                    </div>
                );
            case "accepted":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            the geoworker has accepted your job invitation
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <CloseJobDialog
                                setMessageState={setMessageState}
                                id={id}
                                jobId={Message.jobId}
                            />

                            <SendLocation updateMessage={updateMessage} />
                        </div>
                    </div>
                );
            case "denied":
                return (
                    <p className=" text-md text-destructive w-full">
                        The geoworker has denied your job invitation
                    </p>
                );
            case "closed":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have closed this job.
                        </p>
                    </div>
                );
            case "taken":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have chosen another geoworker to do the job
                        </p>
                        <div className="flex justify-end w-full gap-2">
                            <AlertDialog
                                title="Withraw invitation"
                                description="Are you sure you want to Withraw your job invitation"
                                // action={cancelInvitation}
                                actionButtonText="Withraw"
                            >
                                <Button
                                    onClick={cancelInvitation}
                                    variant="outline"
                                    size="sm"
                                >
                                    Withraw Invitation
                                </Button>
                            </AlertDialog>
                        </div>
                    </div>
                );
            case "feedback":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-success w-full">
                            you have closed this job. and the expert has leaved
                            a feedback for you.
                        </p>
                    </div>
                );
            case "canceled":
                return (
                    <div className="flex flex-col gap-2 w-full">
                        <p className=" text-md text-destructive w-full">
                            you have canceled this job.
                        </p>
                    </div>
                );
            case "withdrawn":
                return (
                    <p className=" text-md text-destructive w-full">
                        you have withdrawn your invitation
                    </p>
                );

            default:
                return null;
        }
    }

    // Helper function to render the message content based on its type
    const [isClient, setIsClient] = useState(true);
    const renderMessageContent = (message) => {
        switch (message.type) {
            case "jobLocation":
                return (
                    <div className="flex flex-col w-96 gap-3 ">
                        {isOwnMessage ? (
                            <>
                                {" "}
                                <p className=" text-md text-black ">
                                    You have shared the exact job location with
                                    the geoworker
                                </p>
                                <div className="flex justify-end w-full gap-2">
                                    <EditLocation
                                        editLocation={editLocation}
                                        location={message.location}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className=" text-md text-black ">
                                    The client has shared the exact work
                                    location with you
                                </p>
                                <div className="flex justify-end w-full gap-2">
                                    <GetLocation location={message.location} />
                                </div>
                            </>
                        )}
                    </div>
                );
            case "budgetEdit":
                return (
                    <div className="flex flex-col w-96 gap-3 ">
                        {isOwnMessage ? (
                            <p className=" text-md text-black ">
                                You have sent a budget edit suggestion
                            </p>
                        ) : (
                            <p className=" text-md text-black ">
                                {isClient ? "The geoworker" : "The Client"} has
                                send a budget edit suggestion
                            </p>
                        )}

                        <p className="text-md text-greyDark font-semibold flex justify-between">
                            <span>from:</span>
                            <span className=" text-primary  ">
                                {message.from}
                            </span>
                            <span>to:</span>
                            <span className=" text-primary  ">
                                {message.to}
                            </span>
                        </p>
                        {isOwnMessage
                            ? budgetRenderFootereSent(isClient)
                            : budgetRenderFootereRecieved(isClient)}
                    </div>
                );
            case "proposal":
                return (
                    <div className="flex flex-col justify-center items-start gap-2 p-2 w-[450px]">
                        <div className="flex justify-between items-center w-full">
                            <h3 className=" text-3xl text-black font-semibold">
                                Proposal
                            </h3>
                            {isOwnMessage ? (
                                <Button
                                    variant="primary2"
                                    size="sm"
                                    onClick={() => {
                                        console.log("key", id);
                                        if (isOwnMessage)
                                            navigate(
                                                `/expertProposalPage/${id}`
                                            );
                                    }}
                                >
                                    Open Proposal
                                </Button>
                            ) : (
                                <Button
                                    variant="primary2"
                                    size="sm"
                                    onClick={() => {
                                        navigate(`/proposal/${id}`);
                                    }}
                                >
                                    View Details
                                </Button>
                            )}
                        </div>
                        {isOwnMessage ? (
                            <p className=" text-md text-black ">
                                You have sent a proposal to this client
                            </p>
                        ) : (
                            <p className=" text-md text-black ">
                                You have recieved a proposal from this geoworker
                            </p>
                        )}
                        <p className="w-full p-4 bg-bg rounded-3xl">
                            Cover Letter - {message.coverLetter}
                        </p>
                        <div className="flex-grow mb-2">
                            <p className="text-md text-primary font-semibold ">
                                {message.budget}
                            </p>
                        </div>
                        {isOwnMessage
                            ? proposalRenderFooterSent()
                            : proposalRenderFootereRecieved()}
                    </div>
                );
            case "invitation":
                return (
                    <div className="flex flex-col justify-center items-start gap-2 p-2 w-[450px]">
                        <div className="flex justify-between items-center w-full">
                            <h3 className=" text-3xl text-black font-semibold">
                                {message.title}
                            </h3>
                            {isOwnMessage ? (
                                <Button
                                    variant="primary2"
                                    size="sm"
                                    onClick={() => {
                                        navigate(`/job/${message.jobId}`);
                                    }}
                                >
                                    Open Job Post
                                </Button>
                            ) : (
                                <Button
                                    variant="primary2"
                                    size="sm"
                                    onClick={() => {
                                        navigate(`/job/${message.jobId}`);
                                    }}
                                >
                                    view job post
                                </Button>
                            )}
                        </div>
                        {isOwnMessage ? (
                            <p className=" text-md text-black ">
                                You've Invited this geoworker for your job
                            </p>
                        ) : (
                            <p className=" text-md text-black ">
                                You've Been Invited to a New Job Opportunity!
                            </p>
                        )}
                        <div
                            className="bg-cover bg-center rounded-lg h-[250px] w-full"
                            style={{
                                backgroundImage: `url(${message.images ? message.images[0] : ""})`,
                            }}
                        />
                        <div className="flex-grow mb-2">
                            {/* <Category
                category={message.category}
                subCategory={message.subCategory}
                size="sm"
              /> */}

                            <p className="text-md text-primary font-semibold ">
                                {message.budget}
                            </p>
                            <Location
                                wilaya={message.wilaya}
                                city={message.city}
                                size="sm"
                            />
                        </div>
                        {isOwnMessage
                            ? invitationRenderFooterSent()
                            : invitationRenderFooterRecieved()}
                    </div>
                );
            case "text":
                return (
                    <div className="max-w-full md:max-w-lg lg:max-w-xl">
                        <p className="text-sm font-sans text-black">
                            {message.content}
                        </p>
                    </div>
                );
            case "image":
                return <ImageDrawer url={message.url} />;
            case "file":
                return (
                    <div className="flex flex-row items-center justify-center">
                        <File className="m-2 h-4 w-4 shrink-0" />
                        <a href={message.url} download className="text-sm">
                            {message.content}
                        </a>
                    </div>
                );
            default:
                return <p className="text-sm">Unsupported message type</p>;
        }
    };

    return (
        <div
            className={`flex ${
                isOwnMessage ? "flex-row-reverse" : ""
            } mb-2 items-end`}
        >
            <div
                className={`p-4 my-1 mx-2  ${
                    isOwnMessage
                        ? "bg-secondaryo rounded-s-2xl rounded-t-3xl"
                        : "bg-white rounded-e-3xl rounded-t-3xl"
                }  ${(Message.type == "invitation" || Message.type == "proposal" || Message.type == "budgetEdit" || Message.type == "jobLocation") && "bg-white"} `}
            >
                {renderMessageContent(Message)}
            </div>
            <span className="text-xs text-gray-500">{timestamp}</span>
        </div>
    );
}

export default MessageItem;

// Here's a breakdown of the component:

// Props:
// senderName: The name of the sender. This could be omitted or null for messages sent by the user themselves.
// message: The text content of the message.
// timestamp: When the message was sent. You can format this timestamp according to your preferences before passing it to the component.
// isOwnMessage: A boolean indicating whether the message was sent by the user. This affects the alignment and background color to differentiate between incoming and outgoing messages.
// Styling:
// The component uses Tailwind CSS classes for styling. Messages sent by the user (isOwnMessage is true) are aligned to the end and have a different background color (bg-blue-100) compared to messages from others (bg-gray-100).
// The max-w-xs md:max-w-md classes limit the width of the messages, making them more readable and ensuring they don't stretch across the entire container on larger screens.
// The rounded-lg class adds rounded corners to the message bubble.
