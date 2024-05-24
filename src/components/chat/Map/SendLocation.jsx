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
import { MapPin, Locate } from "lucide-react";
import MapCompo from "./MapClientSend";
import { wilayasCoords } from "@/data/wilayasCoords";
import axios from 'axios';
const wilayas = [
    { wilaya: "Adrar", number: 1 },
    { wilaya: "Chlef", number: 2 },
    { wilaya: "Laghouat", number: 3 },
    { wilaya: "Oum El Bouaghi", number: 4 },
    { wilaya: "Batna", number: 5 },
    { wilaya: "Béjaïa", number: 6 },
    { wilaya: "Biskra", number: 7 },
    { wilaya: "Béchar", number: 8 },
    { wilaya: "Blida", number: 9 },
    { wilaya: "Bouira", number: 10 },
    { wilaya: "Tamanrasset", number: 11 },
    { wilaya: "Tébessa", number: 12 },
    { wilaya: "Tlemcen", number: 13 },
    { wilaya: "Tiaret", number: 14 },
    { wilaya: "Tizi Ouzou", number: 15 },
    { wilaya: "Algiers", number: 16 },
    { wilaya: "Djelfa", number: 17 },
    { wilaya: "Jijel", number: 18 },
    { wilaya: "Sétif", number: 19 },
    { wilaya: "Saïda", number: 20 },
    { wilaya: "Skikda", number: 21 },
    { wilaya: "Sidi Bel Abbès", number: 22 },
    { wilaya: "Annaba", number: 23 },
    { wilaya: "Guelma", number: 24 },
    { wilaya: "Constantine", number: 25 },
    { wilaya: "Médéa", number: 26 },
    { wilaya: "Mostaganem", number: 27 },
    { wilaya: "M'Sila", number: 28 },
    { wilaya: "Mascara", number: 29 },
    { wilaya: "Ouargla", number: 30 },
    { wilaya: "Oran", number: 31 },
    { wilaya: "El Bayadh", number: 32 },
    { wilaya: "Illizi", number: 33 },
    { wilaya: "Bordj Bou Arréridj", number: 34 },
    { wilaya: "Boumerdès", number: 35 },
    { wilaya: "El Tarf", number: 36 },
    { wilaya: "Tindouf", number: 37 },
    { wilaya: "Tissemsilt", number: 38 },
    { wilaya: "El Oued", number: 39 },
    { wilaya: "Khenchela", number: 40 },
    { wilaya: "Souk Ahras", number: 41 },
    { wilaya: "Tipaza", number: 42 },
    { wilaya: "Mila", number: 43 },
    { wilaya: "Aïn Defla", number: 44 },
    { wilaya: "Naâma", number: 45 },
    { wilaya: "Aïn Témouchent", number: 46 },
    { wilaya: "Ghardaïa", number: 47 },
    { wilaya: "Relizane", number: 48 },
    { wilaya: "Timimoun", number: 49 },
    { wilaya: "Bordj Badji Mokhtar", number: 50 },
    { wilaya: "Ouled Djellal", number: 51 },
    { wilaya: "Béni Abbès", number: 52 },
    { wilaya: "In Salah", number: 53 },
    { wilaya: "In Guezzam", number: 54 },
    { wilaya: "Touggourt", number: 55 },
    { wilaya: "Djanet", number: 56 },
    { wilaya: "El M'Ghair", number: 57 },
    { wilaya: "El Menia", number: 58 },
];
export default function SendLocation({updateMessage}) {
    const [wilayaNumber, setWilayaNumber] = useState(16);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/fetchWilayaData");
            if (response.data) {
                wilayas.map((w) => {
                    if (w.wilaya.toLowerCase() == response.data.wilaya)
                        setWilayaNumber(w.number);
                });
            }
            console.log("wilaya:", response.data);
        };
        fetchData();
    }, []);
    return (
        <Drawer dismissible={false}>
            <DrawerTrigger asChild>
                <Button size="sm" onClick={() => {}}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Send Job Location
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
                            <h3 className=" text-3xl text-black font-semibold">
                                Maps
                            </h3>
                        </div>
                        <p className=" text-lg text-black w-full pl-14 p-1">
                            Click on the map to select your job location, or use
                            the 'Locate'{" "}
                            <Locate className="w-fit h-fit inline-block stroke-[1.5px]" />{" "}
                            button to set your current location.
                        </p>
                    </div>
                    <MapCompo
                        updateMessage={updateMessage}
                        center={wilayasCoords[wilayaNumber]}
                    />
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
