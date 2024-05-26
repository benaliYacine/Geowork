import React, { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import brightColorsStyles from "./style";
import { ZoomIn, ZoomOut, Navigation, Locate, LocateFixed } from "lucide-react";
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
import { easeInOutSine, easeInCubic, easeOutCubic } from "./easingFunctions";
import moveTo from "./moveTo";
import DirectionsIcon from "@/assets/illustrations/DirectionsW.svg";
import { ChevronLeft } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { createRoot } from "react-dom/client";
import {
  useMapsLibrary,
  useMap,
  AdvancedMarker,
  APIProvider,
  InfoWindow,
  Map,
  Marker,
  Pin,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { MapPin } from "lucide-react";

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setOptions({});
  }, [map]);

  return <></>;
};

export default function MapCompo({ center, location }) {
  const GOOGLE_MAPS_API_KEY = "AIzaSyAOCLqzTy2eOzu-BAKdLo1jedug0qk4-Kc";

  const [showMarker, setShowMarker] = useState(location);
  const [showDirections, setShowDirections] = useState(false);
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [zoom, setZoom] = useState(7);
  const [mapCenter, setCenter] = useState({ lat: 34.7538, lng: 3.0588 });
  const [lastMapEventCenter, setLastMapEventCenter] = useState(mapCenter);
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [UserLocationInfowindowOpen, setUserLocationInfowindowOpen] =
    useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [clickMarkerRef, clickMarker] = useAdvancedMarkerRef();
  const [jobLocation, setJobLocation] = useState(null);

  useEffect(() => {
    setTimeout(
      moveTo(zoom, 13, setZoom, lastMapEventCenter, location, setCenter),
      0
    );
  }, []);

  const handleZoomIn = () => {
    let targetZoom = zoom + 1;
    let currentStep = 0;
    const smoothZoomStep = 0.01;
    const smoothZoomTime = 1;
    function stepZoomIn() {
      if (currentStep <= 1) {
        const easedStep = easeInOutSine(currentStep);
        setZoom((z) => {
          return z + (targetZoom - z) * easedStep;
        });
        currentStep += smoothZoomStep;
        setTimeout(stepZoomIn, smoothZoomTime);
      }
    }
    stepZoomIn();
  };

  const handleZoomOut = () => {
    let targetZoom = zoom - 1;
    let currentStep = 0;
    const smoothZoomStep = 0.01;
    const smoothZoomTime = 1;
    function stepZoomOut() {
      if (currentStep <= 1) {
        const easedStep = easeInOutSine(currentStep);
        setZoom((z) => {
          return z + (targetZoom - z) * easedStep;
        });
        currentStep += smoothZoomStep;
        setTimeout(stepZoomOut, smoothZoomTime);
      }
    }
    stepZoomOut();
  };

  function getUserLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    const handleSuccess = (position) => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      // moveTo(zoom, 17, setZoom, lastMapEventCenter, userLocation, setCenter);
      setUserLocationMarker(userLocation);
      setUserLocationInfowindowOpen(true);
      setShowDirections(true);
    };

    const handleError = (error) => {
      alert(`Geolocation error: ${error.message}`);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }

  const backToJobLocation = () => {
    moveTo(zoom, 17, setZoom, lastMapEventCenter, location, setCenter);
  };

  return (
    <div
      className="rounded-xl overflow-hidden relative"
      style={{ height: "100%", width: "100%" }}
    >
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={mapCenter}
          center={mapCenter}
          zoom={zoom}
          mapId={"49ae42fed52588c3"}
          onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
          onCenterChanged={(ev) => {
            setCenter(null);
            setLastMapEventCenter(ev.detail.center);
          }}
          disableDefaultUI={true}
        >
          {showDirections && (
            <Directions origin={userLocationMarker} destination={showMarker} />
          )}

          {showMarker && (
            <>
              <AdvancedMarker
                ref={clickMarkerRef}
                position={{ lat: showMarker.lat, lng: showMarker.lng }}
                onClick={() => setInfowindowOpen(true)}
              >
                <Pin
                  background={"#ff5400"}
                  borderColor={"#ff5400"}
                  glyphColor={"#fff"}
                  scale={1.2}
                ></Pin>
              </AdvancedMarker>
              {infowindowOpen && (
                <InfoWindow
                  anchor={clickMarker}
                  maxWidth={200}
                  onCloseClick={() => setInfowindowOpen(false)}
                >
                  <p className="text-lg font-sans font-normal">Job location</p>
                </InfoWindow>
              )}
            </>
          )}
          {userLocationMarker && (
            <>
              <AdvancedMarker
                ref={markerRef}
                onClick={() => setUserLocationInfowindowOpen(true)}
                position={userLocationMarker}
                title={"AdvancedMarker with custom html content."}
              >
                <div className="p-[3px] border-[3px] border-primary rounded-full h-fit w-fit">
                  <div className="bg-primary h-3 w-3 rounded-full"></div>
                </div>
              </AdvancedMarker>
              {UserLocationInfowindowOpen && (
                <InfoWindow
                  anchor={marker}
                  maxWidth={200}
                  onCloseClick={() => setUserLocationInfowindowOpen(false)}
                >
                  <p className="text-lg font-sans font-normal">Your location</p>
                </InfoWindow>
              )}
            </>
          )}
        </Map>
        <MyComponent />
      </APIProvider>
      <div className="flex flex-col gap-3 absolute right-5 bottom-28 items-end p-2 rounded-full backdrop-blur-sm shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]">
        <Button
          className="p-3 h-fit w-fit"
          onClick={handleZoomIn}
          variant="outline"
        >
          <ZoomIn />
        </Button>
        <Button
          className="p-3 h-fit w-fit"
          onClick={handleZoomOut}
          variant="outline"
        >
          <ZoomOut />
        </Button>
        <Button
          className="p-3 h-fit w-fit border-2 border-input"
          onClick={() => {
            getUserLocation();
          }}
        >
          <img
            src={DirectionsIcon}
            className="h-6 w-6 inline-block stroke-[1.4px]"
            alt="Directions icon"
          />
        </Button>
      </div>
      <div className="flex gap-2 absolute right-5 bottom-5 p-3 rounded-full backdrop-blur-sm shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]">
        <Button onClick={backToJobLocation} variant="outline">
          Back to job location
        </Button>
      </div>
    </div>
  );
}

import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Footprints, CarFront, Compass } from "lucide-react";

function Directions({ origin, destination }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [travelMode, setTravelMode] = useState(google.maps.TravelMode.DRIVING);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected ? selected.legs[0] : null;

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());

    const rendererOptions = {
      map,
      suppressMarkers: true, // Suppress default markers
      polylineOptions: {
        strokeColor: "#ff5400",
        strokeOpacity: travelMode === google.maps.TravelMode.WALKING ? 0 : 1,
        icons:
          travelMode === google.maps.TravelMode.WALKING
            ? [
                {
                  icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 2,
                    strokeOpacity: 1,
                  },
                  offset: "0",
                  repeat: "10px",
                },
              ]
            : null,
      },
    };
    setDirectionsRenderer(
      new routesLibrary.DirectionsRenderer(rendererOptions)
    );
  }, [routesLibrary, map, travelMode]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination)
      return;

    directionsService
      .route({
        origin: origin,
        destination: destination,
        travelMode: travelMode,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => console.error("Directions request failed:", error));

    return () => directionsRenderer && directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, origin, destination, travelMode]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer, travelMode]);

  if (!leg) return null;

  return (
    <div className="h-fit max-w-80 absolute top-4 left-4  p-4 rounded-3xl backdrop-blur-sm shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]">
      <h2 className=" text-primary font-bold text-xl inline-block">Route:</h2>
      <p className="text-black font-medium inline-block ml-2">
        {selected.summary}
      </p>
      {/* <p className=" text-black font-medium">
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p> */}
      <div className="m-2">
        <p>Distance: {leg.distance ? leg.distance.text : ""}</p>
        <p>Duration: {leg.duration ? leg.duration.text : ""}</p>
      </div>
      <h2 className="text-primary font-bold text-xl mt-2">Other Routes: </h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <Button
              size="none"
              variant="link"
              className=" text-black hover:text-primary px-2 py-1 text-wrap text-start"
              onClick={() => setRouteIndex(index)}
            >
              <Compass className="mr-2 stroke-[1.5px] min-w-5 w-4 min-h-5 h-5" />
              {route.summary}
            </Button>
          </li>
        ))}
      </ul>
      <h2 className="text-primary font-bold text-xl mt-2">Travel Mode: </h2>
      <div className="mt-2 w-full flex items-center justify-center">
        <RadioGroup className="flex">
          <div className="flex">
            <Label
              className={cn(
                "cursor-pointer space-x-2 flex items-center justify-center px-4 py-2 border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                travelMode === google.maps.TravelMode.DRIVING
                  ? "text-primary  backdrop-blur-sm border-primary rounded-l-full"
                  : "text-greyDark  backdrop-blur-sm  border-greyDark rounded-l-full"
              )}
              onClick={() => setTravelMode(google.maps.TravelMode.DRIVING)}
              htmlFor="driving"
            >
              {/* <RadioGroupItem
                value="driving"
                id="driving"
                className={cn(
                  travelMode === google.maps.TravelMode.DRIVING
                    ? "border-primary"
                    : "border-greyDark"
                )}
              /> */}
              Driving <CarFront className="ml-2" />
            </Label>
            <Label
              className={cn(
                "cursor-pointer flex items-center space-x-2 justify-center px-4 py-2 border-t border-b border-r text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                travelMode === google.maps.TravelMode.WALKING
                  ? "text-primary backdrop-blur-sm  border-primary rounded-r-full"
                  : "text-greyDark backdrop-blur-sm border-greyDark rounded-r-full"
              )}
              onClick={() => setTravelMode(google.maps.TravelMode.WALKING)}
              htmlFor="walking"
            >
              {/* <RadioGroupItem
                value="walking"
                id="walking"
                className={cn(
                  travelMode === google.maps.TravelMode.WALKING
                    ? "border-primary"
                    : "border-greyDark"
                )}
              /> */}
              Walking <Footprints className="ml-2" />
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
