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
import { React, useState, useEffect } from "react";
import Profile from "@/components/profile/Profile";
import axios from 'axios';
import { ScrollArea } from "@/components/ui/scroll-area";
export default function ProfileDrawer({ expert }) {
  const [info, setInfo] = useState({})
  const [profileInfo, setProfileInfo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      console.log("iddddddddddd", expert.id);
      const response = await axios.get(`/expertInfo/${expert.id}`);
      console.log("profileDrawer", response.data);
      if (response.data) {
        setInfo(response.data)
      }
      if (response.data.profile) {
        setProfileInfo(response.data.profile)
      }
    }
    fetchData();
  }, []);

  const updateProfileInfo = (newInfo) => {
    setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };
  if (profileInfo)
    return (
      <Drawer>
        <DrawerTrigger>
          <Button
            variant="title"
            className="text-lg font-semibold mb-1 "
            size="none"
          >
            {`${info.name.first} ${info.name.last}`}
          </Button>
        </DrawerTrigger>
        <DrawerContent className="h-full lg:w-4/5 w-full " data-vaul-no-drag>
          {/* <DrawerHeader data-vaul-no-drag>
          <DrawerTitle data-vaul-no-drag>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription data-vaul-no-drag>
            This action cannot be undone.
          </DrawerDescription>
        </DrawerHeader> */}
        <ScrollArea className="px-2 mx-1">
          <div className="flex items-center justify-between mt-2">
            <DrawerClose
              asChild
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
              data-vaul-no-drag
            >
              <ChevronLeft className="h-7 w-7" data-vaul-no-drag />
            </DrawerClose>
            <Button variant="link">
              Open profile in a new window
              <ExternalLink className=" stroke-[1.7px] ml-2" />
            </Button>
          </div>
          <Profile
            expert={expert}
            
            profileInfo={profileInfo}
            updateProfileInfo={updateProfileInfo}
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
