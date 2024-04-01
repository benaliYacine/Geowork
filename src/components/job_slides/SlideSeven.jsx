import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import DatePickerFormField from "@/components/DatePickerFormField";
import GenericFormField from "@/components/GenericFormField";
import { Separator } from "@/components/ui/separator";
import AddAvatarCard from "@/components/profile_slides/AddAvatarCard";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  streetAdress: z.string().min(1, "Street Adress is required"),
  phone: z
    .string()
    .regex(
      /^\d{10}$/,
      "Phone Number must be exactly 10 (remove the first 0) digits and contain only numbers"
    ),
  dateBirthday: z.date({ required_error: "Date of birth is required" }),
});

export default function SlideSeven({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
  setIsPhotoAdded,
  setShowPhotoError,
  showPhotoError,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      streetAdress: profileInfo.streetAdress,
      phone: profileInfo.phone,
      dateBirthday: profileInfo.dateBirthday,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateProfileInfo({ dateBirthday: values.dateBirthday });
    updateProfileInfo({ streetAdress: values.streetAdress });
    updateProfileInfo({ phone: values.phone });
    inc(); // gedem el slide id al form valid
    // Proceed with your onSave logic or form values handling here
    console.log(values); // Handle the form values, for example, saving it
  });

  // Use useEffect to update submitFormRef with onSubmit function
  useEffect(() => {
    submitFormRef.current = onSubmit; // Allows the parent to trigger form submission
  }, [submitFormRef, onSubmit]);

  const addImage= (newImage) => {
    updateProfileInfo({
      photoProfile: newImage, // Directly assign the newImage Src
    });
    setIsPhotoAdded(true);
    setShowPhotoError(false);
  };
  const addImageSrc = (newImage) => {
    updateProfileInfo({
      photoProfileSrc: newImage, // Directly assign the newImage Src
    });
  };

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-md text-primary font-header mb-2">
            7/7 Profile
          </div>
          <h2 className="text-4xl font-bold mb-4">
            A few last details, then you can publish your profile.
          </h2>
          <p className="text-md text-greyDark mb-4">
            A professional photo helps you build trust with your clients. To
            keep things safe and simple, we need your personal information.
          </p>
          <div className="flex gap-10">
            <div className="flex gap-2 max-w-32 items-center flex-col">
              <AddAvatarCard
                addImage={addImage}
                addImageSrc={addImageSrc}
                existingPhoto={profileInfo.photoProfile}
                existingPhotoSrc={profileInfo.photoProfileSrc}
                setIsPhotoAdded={setIsPhotoAdded}
                className="flex-2"
              />
              {showPhotoError && (
                <p className="text-xs font-medium text-destructive text-center w-full">
                profile photo is required.
                </p>
              )}
            </div>
            <div className="flex-1 max-w-96">
              <DatePickerFormField
                control={form.control}
                name="dateBirthday"
                label="Date of Birth"
                placeholder="Select your date of birth"
              />
              <Separator className="my-5" />
              <GenericFormField
                control={form.control}
                name="streetAdress"
                label="Street Adress *"
                placeholder="Your Street Adress"
              />
              <GenericFormField
                control={form.control}
                name="phone"
                label="Phone *"
                placeholder="Your phone number"
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
