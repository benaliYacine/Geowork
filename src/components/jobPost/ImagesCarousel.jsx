import { React } from "react";

import { Button } from "@/components/ui/button";
import {  LayoutGrid } from "lucide-react";

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

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function ImagesCarousel({ images }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => {}}>
          <LayoutGrid className="h-4 w-4 mr-2" /> show all photos
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div
          className=" w-full h-screen flex flex-col items-center justify-center p-24 bg-bg relative"
          data-vaul-no-drag
        >
          <DrawerClose
            asChild
            className="absolute top-5 left-5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-bg data-[state=open]:text-muted-foreground"
            data-vaul-no-drag
          >
            <ChevronLeft className="h-7 w-7" data-vaul-no-drag />
          </DrawerClose>
          {/* <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader> */}
          <Carousel className="w-full max-w-5xl mx-auto " data-vaul-no-drag>
            <CarouselContent data-vaul-no-drag className="px-12">
              {images.map((image, index) => (
                <CarouselItem key={index} data-vaul-no-drag>
                  <div className="p-1" data-vaul-no-drag>
                    <div className="w-full" data-vaul-no-drag>
                      <AspectRatio ratio={16 / 9} data-vaul-no-drag>
                        <div
                          data-vaul-no-drag
                          className="bg-cover bg-center rounded-lg h-full w-full"
                          style={{
                            backgroundImage: `url(${image.url})`,
                          }}
                        ></div>
                      </AspectRatio>
                    </div>

                    {/* <div
                      data-vaul-no-drag
                      className="flex h-[500px] items-center justify-center p-6"
                    >
                      <div
                        className="bg-cover bg-center rounded-3xl h-full w-full"
                        style={{
                          backgroundImage: `url(${image})`,
                        }}
                      >
                        {" "}
                      </div>
                    </div> */}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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

