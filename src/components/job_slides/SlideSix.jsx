import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Image } from "lucide-react";
import { Form } from "@/components/ui/form";
import AddImageCard from "@/components/job_slides/AddImageCard";
import AddCoverImageCard from "@/components/job_slides/AddCoverImageCard";
import GenericFormField from "@/components/GenericFormField";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define your schema for SlideOne
const slideOneSchema = z.object({
  title: z.string().min(1, "title is required"),
});

export default function SlideOne({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
}) {
  const images= jobInfo.images;

  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      title: jobInfo.title,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateJobInfo({ title: values.title });
    inc(); // gedem el slide id al form valid
    // Proceed with your onSave logic or form values handling here
    console.log(values); // Handle the form values, for example, saving it
  });

  // Use useEffect to update submitFormRef with onSubmit function
  useEffect(() => {
    submitFormRef.current = onSubmit; // Allows the parent to trigger form submission
  }, [submitFormRef, onSubmit]);

  const handleAddImage = (imageUrl, isCover = false) => {
    if (isCover) {
      // Add as the first image, making it the cover
      setImages([imageUrl, ...images]);
    } else {
      // Add as a regular image
      setImages([...images, imageUrl]);
    }
  };

  const handleDeleteImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-md text-primary font-header mb-2">
            1/6 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">
            last step, Add some photos for your job post
          </h2>
          <p className="text-md text-greyDark mb-4">
            You'll need at least 1 photo to get started. You can add more.
          </p>
          <div className="flex justify-center w-full">
            {/* Render the cover image card if there's no cover image yet or the cover image */}
            <ScrollArea className="h-[400px] w-fit flex flex-col px-2">
              {images.length === 0 ? (
                <AddCoverImageCard onAdd={(url) => handleAddImage(url, true)} />
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
        </form>
      </Form>
    </div>
  );
}
