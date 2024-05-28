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
import axios from 'axios';
import { ChevronLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import JobPost from "@/components/jobPost/JobPost";
import { React, useState,useEffect } from "react";
import Job from "@/components/Job/Job";
import { useNavigate } from "react-router-dom";
export default function JobPostDrawer({ job, children }) {
    const navigate = useNavigate();
    const [idClient,setIdClient]=useState()
    useEffect(()=>{
      const fetchData=async()=>{
        const response=await axios.get('/idClient');
        if(response.data.idClient){
          setIdClient(response.data.idClient)
        }
      }
      fetchData()
    },[])
    return (
        <Drawer>
            <DrawerTrigger>{children}</DrawerTrigger>
            <DrawerContent className="h-full lg:w-4/5 w-full" data-vaul-no-drag>
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
                            <ChevronLeft
                                className="h-7 w-7"
                                data-vaul-no-drag
                            />
                        </DrawerClose>
                        <Button
                            variant="link"
                            onClick={() => {
                                if (
                                    job.isExpert ||
                                    job.closed ||
                                    job.idClient != idClient
                                )
                                    navigate(
                                        `/job/${job.id ? job.id : job._id}`
                                    );
                                else
                                    navigate(
                                        `/jobPostPage/${job.id ? job.id : job._id}`
                                    );
                            }}
                        >
                            Open job in a new window
                            <ExternalLink className=" stroke-[1.7px] ml-2" />
                        </Button>
                    </div>
                    <div className="px-2">
                        <Job
                            jobInfo={job}
                            apply={job.isExpert ? true : false}
                        />
                    </div>
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
