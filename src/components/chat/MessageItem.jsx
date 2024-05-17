import { React, useState } from "react";
import Location from "@/components/common/Location";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Category from "@/components/common/Category";
import Heart from "react-heart";
import { File } from "lucide-react";
import AlertDialog from "@/components/common/AlertDialog";
import CloseJobDialog from "@/components/chat/CloseJobDialog";
import EditBudgetButton from "@/components/chat/EditBudgetButton";
import SendLocation from "@/components/chat/Map/SendLocation";
import GetLocation from "@/components/chat/Map/GetLocation";
import EditLocation from "@/components/chat/Map/EditLocation";

function budgetRenderFootereRecieved(budgetEditState, isClient) {
  switch (budgetEditState) {
    case "waiting":
      return (
        <div className="flex justify-end w-full gap-2">
          <AlertDialog
            title="deny budget edit suggestion"
            description="Are you sure you want to deny this budget edit suggestion"
            action={() => {}}
            actionButtonText="deny"
          >
            <Button variant="outline" size="sm">
              Deny
            </Button>
          </AlertDialog>

          <AlertDialog
            title="Accept budget edit suggestion"
            description="Are you sure you want to accept this budget edit suggestion"
            action={() => {}}
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
    case "denied":
      return (
        <p className=" text-md text-destructive w-full">
          you have denied this budget edit suggestion
        </p>
      );

    default:
      return null;
  }
}
function budgetRenderFootereSent(budgetEditState, isClient) {
  switch (budgetEditState) {
    case "waiting":
      return (
        <div className="flex justify-end w-full gap-2">
          <AlertDialog
            title="cancel budget edit suggestion"
            description="Are you sure you want to cancel this budget edit suggestion"
            action={() => {}}
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
          {isClient ? "The expert" : "The Client"} has accepted your budget edit
          suggestion
        </p>
      );
    case "denied":
      return (
        <p className=" text-md text-destructive w-full">
          {isClient ? "The expert" : "The Client"} has denied your budget edit
          suggestion
        </p>
      );

    default:
      return null;
  }
}
function proposalRenderFootereRecieved(invitationState) {
  switch (invitationState) {
    case "waiting":
      return (
        <div className="flex justify-end w-full gap-2">
          {/* <AlertDialog
            title="deny invitation"
            description="Are you sure you want to deny this job invitation"
            action={() => {}}
            actionButtonText="deny"
          >
            <Button variant="outline" size="sm">
              send budget edit
            </Button>
          </AlertDialog> */}

          <EditBudgetButton budget="" />

          <AlertDialog
            title="Hire expert"
            description="Are you sure you want to Hire this expert"
            action={() => {}}
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
            you have hired this expert.
          </p>
          <div className="flex justify-end w-full gap-2">
            <CloseJobDialog />
            <SendLocation />
          </div>
        </div>
      );

    //makach diny el client maye9derch y deny proposal
    // case "denied":
    //   return (
    //     <p className=" text-md text-destructive w-full">
    //       you have denied this job invitation
    //     </p>
    //   );

    default:
      return null;
  }
}
function proposalRenderFooterSent(invitationState) {
  switch (invitationState) {
    case "waiting":
      return (
        <div className="flex flex-col gap-2 w-full">
          {/* hadi makech parceque makach deny */}
          {/* <p className=" text-md text-warningDark w-full">no reply yet</p> */}
          <div className="flex justify-end w-full gap-2">
            <AlertDialog
              title="Withraw Proposal"
              description="Are you sure you want to Withraw your Proposal"
              action={() => {}}
              actionButtonText="Withraw"
            >
              <Button variant="outline" size="sm">
                {/* Cancel  */}
                Withraw Proposal
              </Button>
            </AlertDialog>

            <Button size="sm">Edit</Button>
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
    // makach deny fel proposal
    // case "denied":
    //   return (
    //     <p className=" text-md text-destructive w-full">
    //       The expert has denied your job invitation
    //     </p>
    //   );

    default:
      return null;
  }
}
function renderFootereRecieved(invitationState) {
  switch (invitationState) {
    case "waiting":
      return (
        <div className="flex justify-end w-full gap-2">
          <EditBudgetButton budget="" />
          <AlertDialog
            title="deny invitation"
            description="Are you sure you want to deny this job invitation"
            action={() => {}}
            actionButtonText="deny"
          >
            <Button variant="primary2" size="sm">
              Deny
            </Button>
          </AlertDialog>
          <AlertDialog
            title="accept invitation"
            description="Are you sure you want to accept this job invitation"
            action={() => {}}
            actionButtonText="accept"
          >
            <Button size="sm">Accept</Button>
          </AlertDialog>
        </div>
      );
    case "accepted":
      return (
        <p className=" text-md text-success w-full">
          you have accepted this job invitation. now, ask the client to share
          the exact job location with you
        </p>
      );
    case "denied":
      return (
        <p className=" text-md text-destructive w-full">
          you have denied this job invitation
        </p>
      );

    default:
      return null;
  }
}
function renderFooterSent(invitationState) {
  switch (invitationState) {
    case "waiting":
      return (
        <div className="flex flex-col gap-2 w-full">
          <p className=" text-md text-warningDark w-full">no reply yet</p>
          <div className="flex justify-end w-full gap-2">
            <AlertDialog
              title="cancel invitation"
              description="Are you sure you want to cancel your job invitation"
              action={() => {}}
              actionButtonText="Yes"
            >
              <Button variant="outline" size="sm">
                Cancel Invitation
              </Button>
            </AlertDialog>

            <SendLocation />
          </div>
        </div>
      );
    case "accepted":
      return (
        <div className="flex flex-col gap-2 w-full">
          <p className=" text-md text-success w-full">
            the expert has accepted your job invitation
          </p>
          <div className="flex justify-end w-full gap-2">
            <CloseJobDialog />

            <SendLocation />
          </div>
        </div>
      );
    case "denied":
      return (
        <p className=" text-md text-destructive w-full">
          The expert has denied your job invitation
        </p>
      );

    default:
      return null;
  }
}

function MessageItem({ senderName, message, timestamp, isOwnMessage }) {
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
                  You have shared the exact job location with the expert
                </p>
                <div className="flex justify-end w-full gap-2">
                  <EditLocation location={message.location} />
                </div>
              </>
            ) : (
              <>
                <p className=" text-md text-black ">
                  The client has shared the exact work location with you
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
                {isClient ? "The expert" : "The Client"} has send a budget edit
                suggestion
              </p>
            )}

            <p className="text-md text-greyDark font-semibold flex justify-between">
              <span>from:</span>
              <span className=" text-primary  ">{message.from}</span>
              <span>to:</span>
              <span className=" text-primary  ">{message.to}</span>
            </p>
            {isOwnMessage
              ? budgetRenderFootereSent(message.state, isClient)
              : budgetRenderFootereRecieved(message.state, isClient)}
          </div>
        );
      case "proposal":
        return (
          <div className="flex flex-col justify-center items-start gap-2 p-2 w-[450px]">
            <div className="flex justify-between items-center w-full">
              <h3 className=" text-3xl text-black font-semibold">Proposal</h3>
              {isOwnMessage ? (
                <Button variant="primary2" size="sm">
                  Open Proposal
                </Button>
              ) : (
                <Button variant="primary2" size="sm">
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
                You have recieved a proposal from this expert
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
              ? proposalRenderFooterSent(message.state)
              : proposalRenderFootereRecieved(message.state)}
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
                <Button variant="primary2" size="sm">
                  Open Job Post
                </Button>
              ) : (
                <Button variant="primary2" size="sm">
                  view job post
                </Button>
              )}
            </div>
            {isOwnMessage ? (
              <p className=" text-md text-black ">
                You've Invited this expert for your job
              </p>
            ) : (
              <p className=" text-md text-black ">
                You've Been Invited to a New Job Opportunity!
              </p>
            )}
            <div
              className="bg-cover bg-center rounded-lg h-[250px] w-full"
              style={{ backgroundImage: `url(${message.images? message.images[0] : ""})` }}
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
              <Location wilaya={message.wilaya} city={message.city} size="sm" />
            </div>
            {isOwnMessage
              ? renderFooterSent(message.state)
              : renderFootereRecieved(message.state)}
          </div>
        );
      case "text":
        return (
          <div className="max-w-full md:max-w-lg lg:max-w-xl">
            <p className="text-sm font-sans text-black">{message.content}</p>
          </div>
        );
      case "image":
        return (
          <img
            src={message.url}
            alt="Sent image"
            className="max-w-xs md:max-w-md rounded-lg"
          />
        );
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
        }  ${(message.type == "invitation" || message.type == "proposal" || message.type == "budgetEdit" || message.type == "jobLocation") && "bg-white"} `}
      >
        {renderMessageContent(message)}
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
