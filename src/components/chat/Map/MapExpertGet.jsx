import React, { useState, useCallback, useEffect } from "react"; // Ensure useState is imported like this

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
console.log(Map);
import { MapPin } from "lucide-react";

const MyComponent = () => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setOptions({
      // draggableCursor: "default",
      // draggingCursor: "move",
    });
    // here you can interact with the imperative maps API
  }, [map]);

  return <></>;
};

export default function MapCompo({ center, location }) {
  const GOOGLE_MAPS_API_KEY = "AIzaSyCPWOgGlKyOIg905D1j2vGYnDgY3iJfAPM";

  const [showMarker, setShowMarker] = useState(location);
  const [userLocationMarker, setUserLocationMarker] = useState(null);
  const [zoom, setZoom] = useState(7);

  const [mapCenter, setCenter] = useState({
    lat: 34.7538,
    lng: 3.0588,
  });
  const [lastMapEventCenter, setLastMapEventCenter] = useState(mapCenter);
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

  // if (loadError) {
  //   return <div>Error loading maps</div>;
  // }

  // if (!isLoaded) {
  //   return (
  //     <div
  //       className="flex items-center justify-center w-full h-full min-h-screen min-w-screen"
  //
  //     >
  //       <PropagateLoader color="#FF5400" />
  //     </div>
  //   );
  // }
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [UserLocationInfowindowOpen, setUserLocationInfowindowOpen] =
    useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [clickMarkerRef, clickMarker] = useAdvancedMarkerRef();
  const [jobLocation, setJobLocation] = useState(null);

  const backToJobLocation = () => {
    moveTo(zoom, 17, setZoom, lastMapEventCenter, location, setCenter);
  };

  return (
    <div
      className=" rounded-xl overflow-hidden relative "
      style={{ height: "100%", width: "100%" }}
    >
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
          defaultCenter={mapCenter}
          center={mapCenter}
          // defaultCenter={{ lat: 43.65, lng: -79.38 }}
          // defaultZoom={zoom}
          zoom={zoom}
          mapId={"49ae42fed52588c3"}
          // mapTypeId={"roadmap"}
          onZoomChanged={(ev) => {
            setZoom(ev.detail.zoom);
          }}
          onCenterChanged={(ev) => {
            setCenter(null);
            setLastMapEventCenter(ev.detail.center);
          }}
          // styles={google.maps.MapTypeStyle}
          // onClick={onMapClick}
          // gestureHandling={"greedy"}

          disableDefaultUI={true}
          // fullscreenControl={false}
        >
          {/* <Directions /> */}

          {showMarker && (
            <>
              <AdvancedMarker
                ref={clickMarkerRef}
                position={{ lat: showMarker.lat, lng: showMarker.lng }}
                onClick={() => setInfowindowOpen(true)}
                // clickable={true}
                // onClick={() => alert("marker was clicked!")}
                // title={"clickable google.maps.Marker"}
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
                  <p className=" text-lg font-sans font-normal">Job location</p>
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
                  <p className=" text-lg font-sans font-normal">
                    Your location
                  </p>
                </InfoWindow>
              )}
            </>
          )}
        </Map>
        <MyComponent />
      </APIProvider>
      <div className="flex flex-col gap-3 absolute right-5 bottom-28 items-end  p-2 rounded-full backdrop-blur-sm shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]">
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
          className=" p-3 h-fit w-fit  border-2 border-input"
          onClick={() => {}}
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
      {/* {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />} */}
    </div>
  );
}

function Directions() {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected ? selected.legs[0] : null;

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "100 Front St, Toronto ON",
        destination: "500 College St, Toronto ON",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        console.log("Directions response:", response); // Log API response
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      })
      .catch((error) => console.error("Directions request failed:", error)); // Catch and log any errors

    return () => directionsRenderer && directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance ? leg.distance.text : ""}</p>
      <p>Duration: {leg.duration ? leg.duration.text : ""}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
