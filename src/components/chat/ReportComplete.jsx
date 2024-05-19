import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign } from "lucide-react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RatingInput from "@/components/common/RatingInput";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import TextareaFormField from "@/components/formFields/TextareaFormField";
import CloseRadioFormField from "@/components/chat/CloseRadioFormField";
// Define your form schema
const formSchema = z.object({
  
});

import IconButton from "@/components/common/IconButton";
import CurrencyFormField from "@/components/formFields/CurrencyFormField";

import { Pencil } from "lucide-react";
import AddImageCard from "@/components/job_slides/slideSix/AddImageCard";
import AddCoverImageCard from "@/components/job_slides/slideSix/AddCoverImageCard";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function CloseJobDialog({}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const [showPhotoError, setShowPhotoError] = useState(false);
  const [isPhotoAdded, setIsPhotoAdded] = useState(false);
  const [images, setImages] = useState([]);

  const handleAddImage = (imageUrl, isCover = false) => {
    if (isCover) {
      // Add as the first image, making it the cover
      setImages([imageUrl, ...images]);
    } else {
      // Add as a regular image
      setImages([...images, imageUrl]);
    }
    setIsPhotoAdded(true);
    setShowPhotoError(false);
  };

  const handleDeleteImage = (index) => {
    if (images.length === 1) {
      console.log("no img show err");
      setIsPhotoAdded(false);
      setShowPhotoError(true);
    }
    setImages(images.filter((_, i) => i !== index));
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // budget: budget,
    },
  });
  const onSubmit = async () => {
    if (!isPhotoAdded) {
      // Assuming slide 7 (index 6) is where the photo is required
      setShowPhotoError(true); // Show error message
      return; // Prevent proceeding to the next step
    }
    
    // console.log(images);
    setDialogOpen(false);
  };

  // Watch the 'type' field from the form
  const type = form.watch("type");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Report as Complete
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* budget */}
              <DialogHeader className="flex flex-col gap-2">
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Report as Complete
                </DialogTitle>

                <DialogDescription>
                  If you have already completed the job, please upload images as
                  proof of your work.
                </DialogDescription>
              </DialogHeader>
              {showPhotoError && (
                <p className="text-xs font-medium text-destructive text-center w-full">
                  At least add one photo to continue.
                </p>
              )}
              <div className="flex justify-center w-full">
                {/* Render the cover image card if there's no cover image yet or the cover image */}

                <ScrollArea className="h-[340px] w-fit flex flex-col px-2">
                  {images.length === 0 ? (
                    <AddCoverImageCard
                      onAdd={(url) => handleAddImage(url, true)}
                    />
                  ) : (
                    <div className="flex flex-col ">
                      <AddCoverImageCard
                        onAdd={(url) => handleAddImage(url, true)}
                        imageUrl={images[0]}
                        onDelete={() => handleDeleteImage(0)}
                      />
                      <div className="flex flex-wrap gap-0 w-[532px]">
                        {images.slice(1).map((image, index) => (
                          <AddImageCard
                            key={index}
                            imageUrl={image}
                            onDelete={() => handleDeleteImage(index + 1)}
                          />
                        ))}
                        <AddImageCard onAdd={handleAddImage} />
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
              {/* Submit Button */}
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="mt-3" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="mt-3" type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CloseJobDialog;
