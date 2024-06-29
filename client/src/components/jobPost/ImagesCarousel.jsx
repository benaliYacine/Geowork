import { React, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ChevronLeft } from "lucide-react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ImagesCarousel({ images }) {
    const [api, setApi] = useState(null);
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                    <LayoutGrid className="h-4 w-4 mr-2" /> show all photos
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div
                    className="w-full h-screen flex flex-col items-center justify-center p-24 bg-bg relative"
                    data-vaul-no-drag
                >
                    <DrawerClose
                        asChild
                        className="absolute top-5 left-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
                        data-vaul-no-drag
                    >
                        <ChevronLeft className="h-7 w-7" data-vaul-no-drag />
                    </DrawerClose>
                    <Carousel
                        setApi={setApi}
                        className="w-full max-w-5xl mx-auto"
                        data-vaul-no-drag
                    >
                        <CarouselContent data-vaul-no-drag className="px-8">
                            {images.map((image, index) => (
                                <CarouselItem key={index} data-vaul-no-drag>
                                    <div className="p-0" data-vaul-no-drag>
                                        <div
                                            className="w-full"
                                            data-vaul-no-drag
                                        >
                                            <AspectRatio
                                                ratio={16 / 9}
                                                data-vaul-no-drag
                                            >
                                                <img
                                                    src={image}
                                                    alt="Sent image"
                                                    className="object-contain w-full h-full rounded-lg"
                                                    data-vaul-no-drag
                                                />
                                            </AspectRatio>
                                        </div>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                    <div className=" mt-4">
                        <p className=" text-center text-xl text-black ">
                            Image {current} of {count}
                        </p>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
