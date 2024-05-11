import React, { useState, useCallback, useEffect } from "react"; // Ensure useState is imported like this

import PropagateLoader from "react-spinners/PropagateLoader";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import brightColorsStyles from "./Map/style";
import { ZoomIn, ZoomOut } from "lucide-react";
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

const center = {
  lat: 36.7538, // latitude for Algiers, Algeria
  lng: 3.0588, // longitude for Algiers, Algeria
};

const MapCompo = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyBQ2HGpfDC2KuongVMDAZUlb1Hn_-Osbk8";

  const [showMarker, setShowMarker] = useState(null);
  const [zoom, setZoom] = useState(12);
  const [lastMapEventCenter, setLastMapEventCenter] = useState(center);
  const [mapCenter, setCenter] = useState(center);
  const onMapClick = (event) => {
    console.log(event);
    console.log(event.detail);
    setShowMarker({
      lat: event.detail.latLng.lat,
      lng: event.detail.latLng.lng,
    });
  };

  const smoothZoomStep = 0.01;

  const smoothZoomTime = 1;

  function easeInOut(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  }

  const handleChangeCenter = () => {
    console.log("lastMapEventCenter", lastMapEventCenter);
    const targetCenter = { lat: 36.7538, lng: 3.0588 };
    let currentStep = 0;
    function stepChangeCenter() {
      if (currentStep <= 1) {
        const easedStep = easeInOut(currentStep);
        const newLat =
          lastMapEventCenter.lat +
          (targetCenter.lat - lastMapEventCenter.lat) * easedStep;
        const newLng =
          lastMapEventCenter.lng +
          (targetCenter.lng - lastMapEventCenter.lng) * easedStep;
        setCenter({ lat: newLat, lng: newLng });
        currentStep += moveStep;
        setTimeout(stepChangeCenter, smoothZoomTime);
      }
    }
    stepChangeCenter();
  };

  const resetToAlgiers = () => {
    // handleChangeCenter();
    const targetZoom = 12; // Default zoom for Algiers
    let intermediaryZoom = 8;
    let currentStep = 0;
    const moveStep = 0.005;
    const moveTime = 1;
    function stepMove2() {
      if (currentStep <= 1) {
        const easedStep = easeInOut(currentStep);
        console.log(
          "zoom is ",
          zoom,
          "setep2 the new zoom must become",
          zoom + (targetZoom - zoom) * easedStep
        );
        setZoom((z) => {
          return z + (targetZoom - z) * easedStep;
        });
        currentStep += moveStep;
        setTimeout(stepMove2, moveTime);
      }
    }
    function stepMove() {
      if (currentStep <= 0.5) {
        const easedStep = easeInOut(currentStep);
        setZoom((z) => {
          return z + (intermediaryZoom - z) * easedStep * 2;
        });
        currentStep += moveStep;
        setTimeout(stepMove, moveTime);
      } else {
        stepMove2();
      }
    }

    stepMove();
  };

  function easeInOutBack(x) {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;
    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  }

  const handleZoomIn = () => {
    let targetZoom = zoom + 1;
    let currentStep = 0;
    function stepZoomIn() {
      if (currentStep <= 1) {
        const easedStep = easeInOut(currentStep);
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
    function stepZoomOut() {
      if (currentStep <= 1) {
        const easedStep = easeInOut(currentStep);
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
  //       data-vaul-no-drag
  //     >
  //       <PropagateLoader color="#FF5400" />
  //     </div>
  //   );
  // }
  const [infowindowOpen, setInfowindowOpen] = useState(true);
  const [markerRef, marker] = useAdvancedMarkerRef();
  return (
    <div
      className=" rounded-xl overflow-hidden relative cursor-pointer"
      data-vaul-no-drag
      style={{ height: "100%", width: "100%" }}
    >
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} data-vaul-no-drag>
        <Map
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
          defaultCenter={mapCenter}
          center={mapCenter}
          // defaultCenter={{ lat: 43.65, lng: -79.38 }}
          defaultZoom={zoom}
          zoom={zoom}
          mapId={"49ae42fed52588c3"}
          mapTypeId={"roadmap"}
          onZoomChanged={(ev) => {
            setZoom(ev.detail.zoom);
          }}
          onCenterChanged={(ev) => {
            setCenter(null);
            setLastMapEventCenter(ev.detail.center);
          }}
          // styles={google.maps.MapTypeStyle}
          onClick={onMapClick}
          // gestureHandling={"greedy"}
          data-vaul-no-drag
          disableDefaultUI={true}
          // fullscreenControl={false}
        >
          <Directions />

          {showMarker && (
            <AdvancedMarker
              position={{ lat: showMarker.lat, lng: showMarker.lng }}

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
          )}

          <AdvancedMarker
            ref={markerRef}
            onClick={() => setInfowindowOpen(true)}
            position={{
              lat: 36.7248,
              lng: 3.0288,
            }}
            title={"AdvancedMarker with custom html content."}
          >
            <div className="p-1 border-4 border-primary rounded-full h-fit w-fit">
              <div className="bg-primary h-4 w-4 rounded-full"></div>
            </div>
          </AdvancedMarker>
          {infowindowOpen && (
            <InfoWindow
              anchor={marker}
              maxWidth={200}
              onCloseClick={() => setInfowindowOpen(false)}
            >
              This is an example for the bla bla combined with an Infowindow.
            </InfoWindow>
          )}
        </Map>
      </APIProvider>
      <Button
        className="absolute right-5 bottom-5 hover:opacity-[100%] p-3 h-fit"
        onClick={handleZoomOut}
      >
        <ZoomOut />
      </Button>
      <Button
        className="absolute right-5 bottom-20 hover:opacity-[100%] p-3 h-fit"
        onClick={handleZoomIn}
      >
        <ZoomIn />
      </Button>
      <Button
        className="absolute right-5 bottom-36 hover:opacity-[100%] p-3 h-fit"
        onClick={resetToAlgiers}
      >
        Back to Algiers
      </Button>
      {/* {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />} */}
    </div>
  );
};

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

export default function SendLocation() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <Button size="sm" onClick={() => {}}>
          <MapPin className="h-4 w-4 mr-2" />
          Send Job Location
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className=" w-full h-screen  flex flex-col items-center justify-center p-4 bg-bg relative"
          data-vaul-no-drag
        >
          <div className=" flex items-center justify-start w-full px-4 pb-4 gap-2">
            <DrawerClose
              asChild
              className=" rounded-sm opacity-70 ring-offset-background transition-translate duration-100  ease-in-out transform hover:translate-x-1  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
              data-vaul-no-drag
            >
              <ChevronLeft className="h-8 w-8" data-vaul-no-drag />
            </DrawerClose>
            <h3 className=" text-3xl text-black font-semibold">Maps</h3>
          </div>

          <MapCompo data-vaul-no-drag />

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
