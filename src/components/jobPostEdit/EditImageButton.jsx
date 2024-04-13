import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"

import AddImageCard from "@/components/job_slides/slideSix/AddImageCard";
import AddCoverImageCard from "@/components/job_slides/slideSix/AddCoverImageCard";
import { ScrollArea } from "@/components/ui/scroll-area";

import IconButton from "@/components/common/IconButton";
import CurrencyFormField from "@/components/formFields/CurrencyFormField";

import { Pencil } from "lucide-react";

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

function EditImageButton({ images, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPhotoAdded, setIsPhotoAdded] = useState(images.length > 0);
  const [showPhotoError, setShowPhotoError] = useState(false);
  const form = useForm();
  const [newImages, setNewImages] = useState(images);

  const handleAddImage = (imageUrl, isCover = false) => {
    if (isCover) {
      // Add as the first image, making it the cover
      setNewImages([imageUrl, ...newImages]);
    } else {
      // Add as a regular image
      setNewImages([...newImages, imageUrl]);
    }
    setIsPhotoAdded(true);
    setShowPhotoError(false);
  };

  const handleDeleteImage = (index) => {
    if (newImages.length === 1) {
      console.log("no img show err");
      setIsPhotoAdded(false);
      setShowPhotoError(true);
    }
    setNewImages(newImages.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    console.log(newImages);

    if (!isPhotoAdded) {
      setShowPhotoError(true); // Show error message
      return; // Prevent proceeding to the next step
    }

    onEdit(newImages);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton variant="outlined" className="h-6 w-6 p-1">
          <Pencil className="h-4 w-4" />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              {/* images */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Images
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              {showPhotoError && (
                <p className="text-xs font-medium text-destructive text-center w-full">
                  At least add one photo to continue.
                </p>
              )}
              <div className="flex justify-center w-full">
                {/* Render the cover image card if there's no cover image yet or the cover image */}

                <ScrollArea className="h-[400px] w-fit flex flex-col px-2">
                  {newImages.length === 0 ? (
                    <AddCoverImageCard
                      onAdd={(url) => handleAddImage(url, true)}
                    />
                  ) : (
                    <div className="flex flex-col ">
                      <AddCoverImageCard
                        onAdd={(url) => handleAddImage(url, true)}
                        imageUrl={newImages[0]}
                        onDelete={() => handleDeleteImage(0)}
                      />
                      <div className="flex flex-wrap gap-0 w-[532px]">
                        {newImages.slice(1).map((image, index) => (
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
                  Save
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditImageButton;
