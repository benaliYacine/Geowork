import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer-right";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { React, useState } from "react";
import Proposal from "@/components/proposalList/Proposal";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
export default function ProposalDrawer({ updateState, proposal }) {
    const navigate = useNavigate();
    const [profileInfo, setProfileInfo] = useState({
        ...proposal.profile,
        photoProfile: proposal.profile.photoProfile.url,
    });

    const updateProfileInfo = (newInfo) => {
        setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
    };

    return (
        <Drawer>
            <DrawerTrigger>
                <Button
                    noScale
                    variant="title"
                    className="text-lg font-semibold mb-1 "
                    size="none"
                >
                    {proposal.name}
                </Button>
            </DrawerTrigger>
            <DrawerContent
                className="h-full lg:w-4/5 w-full "
                data-vaul-no-drag
            >
                {/* <DrawerHeader data-vaul-no-drag>
          <DrawerTitle data-vaul-no-drag>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription data-vaul-no-drag>
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader> */}
                <ScrollArea className="px-2 pr-3 mx-1 bg-bg">
                    <div className="flex items-center justify-between mt-2">
                        <DrawerClose
                            asChild
                            className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
                            data-vaul-no-drag
                        >
                            <ChevronLeft
                                className="h-7 w-7"
                                data-vaul-no-drag
                            />
                        </DrawerClose>
                        <Button
                            onClick={() => {
                                navigate(`/proposal/${proposal.id}`);
                            }}
                            variant="link"
                        >
                            Open proposal in a new window
                            <ExternalLink className=" stroke-[1.7px] ml-2" />
                        </Button>
                    </div>
                    <Proposal
                        updateState={updateState}
                        proposal={proposal}
                        profileInfo={profileInfo}
                        coverLetter={proposal.coverLetter}
                        budget={proposal.budget}
                        action={true}
                    />
                </ScrollArea>
                {/* <DrawerFooter data-vaul-no-drag>
          <div>
            <Button>Submit</Button>
          </div>
          <DrawerClose data-vaul-no-drag>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter> */}
            </DrawerContent>
        </Drawer>
    );
}
