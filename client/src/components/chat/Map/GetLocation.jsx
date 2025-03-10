import React, { useState, useCallback, useEffect } from "react"; // Ensure useState is imported like this
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ChevronLeft } from "lucide-react";
import { MapPin } from "lucide-react";
import Directions from "@/assets/illustrations/Directions.svg";
import MapCompo from "./MapExpertGet";
import { wilayasCoords } from "@/data/wilayasCoords";
export default function SendLocation({ location }) {
  const wilayaNumber = 16;
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <Button size="sm" onClick={() => {}}>
          <MapPin className="h-4 w-4 mr-2" />
          Open Job Location
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full h-screen gap-2 flex flex-col items-center justify-center p-4 px-12 bg-bg relative">
          <div className="w-full">
            <div className=" flex items-center justify-start w-full px-4 gap-2">
              <DrawerClose
                asChild
                className=" rounded-sm opacity-70  transition-translate duration-200  ease-in-out transform hover:translate-x-[-6px]  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
              >
                <ChevronLeft className="h-8 w-8" />
              </DrawerClose>
              <h3 className=" text-3xl text-black font-semibold">Maps</h3>
            </div>
            <p className=" text-lg text-black w-full pl-14 p-1">
              Click the Directions button Directions
              <img
                src={Directions}
                className="w-8 h-8 m-2 inline-block stroke-[1.4px]"
                alt="Directions icon"
              />
              to find your way to the job site.
            </p>
          </div>
          <MapCompo center={wilayasCoords[wilayaNumber]} location={location} />
          {/* <div className="w-full flex items-center justify-end">
            <Button className="">send as job location</Button>
          </div> */}
          {/* <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader> */}

          {/* <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
