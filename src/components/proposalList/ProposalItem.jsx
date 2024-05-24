import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import RatingDisplay from "@/components/common/RatingDisplay";
import Location from "@/components/common/Location";
import SendInvitation from "@/components/expertList/SendInvitation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ProposalDrawer from "@/components/proposalList/ProposalDrawer";
import { getInitials } from "@/lib/utils";
import AlertDialog from "@/components/common/AlertDialog";

import { useState } from "react";
export default function ProposalItem({ proposal }) {
  const [isClick, setClick] = useState(false);
  return (
    <div className="flex  items-center  mb-2 rounded-lg flex-col w-full">
      <div className="flex flex-col items-start p-2 w-full">
        <div className="flex flex-col sm:flex-row items-center w-full">
          <div className="flex mr-auto">
            <div className=" mr-4">
              <Avatar size={16}>
                <AvatarImage src={proposal.avatarUrl} alt={proposal.name} />
                <AvatarFallback>{getInitials(proposal.name)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-grow mb-2">
              <ProposalDrawer proposal={proposal} />
              <p className="text-sm text-gray-600 mb-1">{proposal.role}</p>
              <div className="mb-1">
                <RatingDisplay rating={proposal.rating} />
              </div>
              <Location
                wilaya={proposal.wilaya}
                city={proposal.city}
                size="sm"
              />
              {/* <p className="text-md text-primary font-semibold ">
                {proposal.budget}
              </p> */}
            </div>
          </div>

          <div className="ml-auto sm:ml-0 sm:mb-auto flex gap-4 justify-center items-center">
            <Button variant="outline" size="sm">
              Message
            </Button>
            <AlertDialog
              title="deny proposal"
              description="Are you sure you want to deny this proposal"
              action={() => {}}
              actionButtonText="deny"
            >
              <Button variant="primary2" size="sm">
                deny
              </Button>
            </AlertDialog>
            <AlertDialog
              title="Hire expert"
              description="Are you sure you want to Hire this expert"
              action={() => {}}
              actionButtonText="Hire"
            >
              <Button size="sm">Hire</Button>
            </AlertDialog>
          </div>
        </div>
        <p className="text-md text-primary font-semibold ">{proposal.budget}</p>
        <p className=" font-normal line-clamp-2">
          Cover Letter - {proposal.coverLetter}
        </p>
      </div>
      <Separator />
    </div>
  );
}
