import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import AddExperienceCard from "@/components/profile_slides/slideFour/AddExperienceCard";
import AddExperienceButton from "@/components/profile_slides/slideFour/AddExperienceButton";
import ExperienceCard from "@/components/profile_slides/slideFour/ExperienceCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
export default function SlideFour({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  // const [Experiences, setExperiences] = useState([]);

  const addExperience = (newExperience) => {
    updateProfileInfo({
      experiences: [...profileInfo.experiences, newExperience],
    });
  };

  const deleteExperience = (indexToDelete) => {
    const filteredExperiences = profileInfo.experiences.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      experiences: filteredExperiences,
    });
  };

  const editExperience = (indexToEdit, updatedExperience) => {
    const updatedExperiences = profileInfo.experiences.map(
      (experience, index) =>
        index === indexToEdit ? updatedExperience : experience
    );
    updateProfileInfo({
      experiences: updatedExperiences,
    });
  };

  const form = useForm({});

  const onSubmit = form.handleSubmit((values) => {
    inc(); // gedem el slide id al form valid
    // Proceed with your onSave logic or form values handling here
    console.log(values); // Handle the form values, for example, saving it
  });

  // Use useEffect to update submitFormRef with onSubmit function
  useEffect(() => {
    submitFormRef.current = onSubmit; // Allows the parent to trigger form submission
  }, [submitFormRef, onSubmit]);

  return (
    <div className="space-y-4">
      <div className="text-md text-primary font-header mb-2">4/7 Profile</div>
      <h2 className="text-4xl font-bold mb-4">
        If you have any other relevant work experience, add it here.
      </h2>
      <p className="text-md text-greyDark mb-4">
        Here's where you can detail informal work, like helping in a family
        business, freelance projects, or community services. Every bit of
        experience counts.
      </p>
      {profileInfo.experiences.length === 0 ? (
        <div className="px-12 py-6">
          <AddExperienceCard addExperience={addExperience} />
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {" "}
          {/* Add gap for spacing and items-center for vertical alignment */}
          <AddExperienceButton addExperience={addExperience} />
          <Carousel
            opts={{
              align: "start",
            }}
            className={
              profileInfo.experiences.length >= 3
                ? "max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full mx-12 my-4"
                : "max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full mx-0 my-4"
            }
          >
            <CarouselContent>
              {profileInfo.experiences.map((experience, index) => (
                <CarouselItem key={index} className="basis-1/">
                  {/* basis-1/ ghi bah na7i el basis full li fel carousel mane9derch na7iha temak parceque ne7tajha fel job images carousel */}

                  <ExperienceCard
                    key={index}
                    experience={experience}
                    title={experience.title}
                    description={experience.description}
                    onEdit={(newExp) => editExperience(index, newExp)}
                    onDelete={() => deleteExperience(index)}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className={!(profileInfo.experiences.length >= 3) && " hidden"}
            />
            <CarouselNext
              className={!(profileInfo.experiences.length >= 3) && " hidden"}
            />
          </Carousel>
        </div>
      )}
    </div>
  );
}
