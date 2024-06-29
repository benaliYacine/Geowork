import axios from "axios";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import IconButton from "@/components/common/IconButton";
import { Pencil, Plus } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import character from "@/assets/illustrations/character.svg";
function EditAvatarCard({
  existingPhotoSrc = undefined,
  addImage,
  variant = "primary",
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [image, setImage] = useState(existingPhotoSrc);
  const [scale, setScale] = useState(2); // Default scale
  const editorRef = useRef(null);

  const onSave = async () => {
    if (image && editorRef.current) {
      const canvasScaled = editorRef.current.getImageScaledToCanvas();

      const newImage = canvasScaled.toDataURL();
      addImage(newImage); // Call the prop function to update parent state
      console.log(newImage);


      setDialogOpen(false); // Close dialog
      setSaveAttemptedWithoutImage(false); // Reset the warning message state
    } else {
      setSaveAttemptedWithoutImage(true); // Show warning message
    }
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0] && elem.target.files[0].size > 5 * 1024 * 1024) {
      alert("File is too big! Maximum size is 5MB.");
      elem.target.value = ""; // Reset input value
    } else if (elem.target.files[0]) {
      setImage(elem.target.files[0]);
    }
  };

  const handleScaleChange = (value) => {
    setScale(value[0] / 100); // Assuming the slider provides a value from 0 to 100
  };
  const fileInputRef = useRef(null);
  const [saveAttemptedWithoutImage, setSaveAttemptedWithoutImage] =
    useState(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onBeforeFileLoad}
        accept="image/*"
        className="hidden"
      />
      <div className="flex flex-col items-center gap-4">
        <DialogTrigger asChild>
          <IconButton variant={variant}>
            <Pencil className="h-4 w-4" />
          </IconButton>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-[500px]">
        <div className="flex">
          <div className="relative flex-1 flex flex-col items-center justify-start mr-4">
            <h3 className="font-header font-bold text-2xl my-2">Your Photo</h3>
            {image ? (
              <>
                {/* Render AvatarEditor when an image is selected */}
                <div className="relative w-[200px] h-[200px]">
                  <AvatarEditor
                    className="bg-secondaryo rounded-full"
                    ref={editorRef}
                    image={image}
                    width={500} // Higher resolution
                    height={500} // Higher resolution
                    border={50}
                    borderRadius={10000000}
                    color={[255, 255, 255, 0.6]} // RGBA
                    scale={scale}
                    rotate={0}
                    onBeforeFileLoad={onBeforeFileLoad}
                    style={{ width: "100%", height: "auto" }} // Control display size
                  />
                </div>
                <Slider
                  className="mt-6"
                  defaultValue={[200]} // Initial scale set to 100%
                  step={1}
                  min={50} // Min scale 50%
                  max={300} // Max scale 300%
                  onValueChange={handleScaleChange}
                />
                <Button
                  size="none"
                  variant="link"
                  onClick={() => {
                    // addImage(null);
                    // setIsPhotoAdded(false);
                    setImage(null);
                    // setPreview(null);
                    fileInputRef.current.value = ""; // Clear the file input after deleting the image
                  }}
                  className="mt-4"
                >
                  Delete Current Image
                </Button>
              </>
            ) : (
              <>
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="relative bg-secondaryo rounded-full h-[200px] w-[200px] border border-dashed border-primary cursor-pointer"
                >
                  <div className="w-[100px] h-[100px] absolute top-[50px] left-[50px] p-0 cursor-pointer  items-start  transition duration-300 ease-in-out transform active:scale-100 hover:scale-105">
                    <div className="relative">
                      <img
                        src={character}
                        alt="character"
                        className=""
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "9999px",
                        }}
                      />
                      <IconButton
                        variant="sprimary"
                        className="absolute bottom-1 right-1"
                      >
                        <Plus className="h-3 w-3" />
                      </IconButton>
                    </div>
                  </div>
                </div>
                {saveAttemptedWithoutImage && (
                  <p className="text-xs font-medium text-destructive mt-2 text-center">
                    Please add an image before saving.
                  </p>
                )}
              </>
            )}
          </div>

          <div className="flex-2 flex items-center">
            <div className=" text-start mr-1">
              <h3 className="font-header font-bold text-lg my-2">
                Show clients the best version of yourself!
              </h3>
              <p className="font-sans text-sm">
                Must be an actual photo of you. Logos, clip-art, group photos,
                and digitally-altered images are not allowed.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={onSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditAvatarCard;
