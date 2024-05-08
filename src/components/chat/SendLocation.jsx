import { React } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MapPin } from "lucide-react";

import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Padding } from "@mui/icons-material";

const libraries = ["places"];
const mapContainerStyle = {
  width: "max-content",
  height: "max-content",
};
const center = {
  lat: 36.7538, // latitude for Algiers, Algeria
  lng: 3.0588, // longitude for Algiers, Algeria
};

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAfuO7mnXJNvNVIYYMQVeChPu8KXIU49b8",
    libraries,
  });

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return (
      <div
        className="flex items-center justify-center w-full h-full min-h-screen min-w-screen"
        data-vaul-no-drag
      >
        <PropagateLoader color="#FF5400" />
      </div>
    );
  }

  return (
    <div className="p-" data-vaul-no-drag>
      <GoogleMap
        data-vaul-no-drag
        zoom={12}
        center={center}
      >
        <Marker position={center} data-vaul-no-drag />
      </GoogleMap>
    </div>
  );
};

export default function SendLocation() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="sm" onClick={() => {}}>
          <MapPin className="h-4 w-4 mr-2" />
          Send Job Location
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className=" w-full h-screen flex flex-col items-center justify-center p-4 bg-bg relative"
          data-vaul-no-drag
        >
          <DrawerClose
            asChild
            className="absolute top-5 left-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
            data-vaul-no-drag
          >
            <ChevronLeft className="h-7 w-7" data-vaul-no-drag />
          </DrawerClose>
          <div className="w-96 h-96">
            <Map data-vaul-no-drag />
          </div>
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
