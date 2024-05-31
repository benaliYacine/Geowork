import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

function ImageDrawer({ url }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <img
                    src={url}
                    alt="Sent image"
                    className="max-w-xs md:max-w-md rounded-lg cursor-pointer"
                />
            </DialogTrigger>
            <DialogContent className=" w-fit pt-12 flex justify-center items-center">
                <div className="max-w-full max-h-full flex justify-center items-center">
                    <img
                        src={url}
                        alt="Sent image"
                        className=" h-auto w-[1800px]  rounded-lg"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ImageDrawer;
