import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import AddImageCard from "@/components/job_slides/slideSix/AddImageCard";
import AddCoverImageCard from "@/components/job_slides/slideSix/AddCoverImageCard";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SlideSix({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
  setIsPhotoAdded,
  setShowPhotoError,
  showPhotoError,
}) {
  const form = useForm();

  const onSubmit = form.handleSubmit((values) => {
    inc(); // gedem el slide id al form valid
    // Proceed with your onSave logic or form values handling here
    console.log(jobInfo.images); // Handle the form values, for example, saving it
  });

  // Use useEffect to update submitFormRef with onSubmit function
  useEffect(() => {
    submitFormRef.current = onSubmit; // Allows the parent to trigger form submission
  }, [submitFormRef, onSubmit]);

  const handleAddImage = (imageUrl, isCover = false) => {
    if (isCover) {
      // Add as the first image, making it the cover
      updateJobInfo({ images: [imageUrl, ...jobInfo.images] });
    } else {
      // Add as a regular image
      updateJobInfo({ images: [...jobInfo.images, imageUrl] });
    }
    setIsPhotoAdded(true);
    setShowPhotoError(false);
  };

  const handleDeleteImage = (index) => {
    if (jobInfo.images.length === 1) {
      console.log("no img show err");
      setIsPhotoAdded(false);
      setShowPhotoError(true);
    }
    updateJobInfo({ images: jobInfo.images.filter((_, i) => i !== index) });
  };

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-md text-primary font-header mb-2">
            6/6 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">
            last step, Add some photos for your job post
          </h2>
          <p className="text-md text-greyDark mb-4">
            You'll need at least 1 photo to get started. You can add more.
          </p>
          {showPhotoError && (
            <p className="text-xs font-medium text-destructive text-center w-full">
              At least add one photo to continue.
            </p>
          )}
          <div className="flex justify-center w-full">
            {/* Render the cover image card if there's no cover image yet or the cover image */}

            <ScrollArea className="h-[340px] w-fit flex flex-col px-2">
              {jobInfo.images.length === 0 ? (
                <AddCoverImageCard onAdd={(url) => handleAddImage(url, true)} />
              ) : (
                <div className="flex flex-col ">
                  <AddCoverImageCard
                    onAdd={(url) => handleAddImage(url, true)}
                    imageUrl={jobInfo.images[0]}
                    onDelete={() => handleDeleteImage(0)}
                  />
                  <div className="flex flex-wrap gap-0 w-[532px]">
                    {jobInfo.images.slice(1).map((image, index) => (
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
        </form>
      </Form>
    </div>
  );
}
