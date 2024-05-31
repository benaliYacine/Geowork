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
            <DialogContent className=" w-fit max-w-full max-h-full pt-12 flex justify-center items-center">
                <div className="max-w-full max-h-full flex justify-center items-center">
                    <img
                        src={url}
                        alt="Sent image"
                        className="max-h-[600px] max-w-full min-w-[600px] aspect-auto rounded-lg"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ImageDrawer;
