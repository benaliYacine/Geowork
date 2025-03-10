import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import AddEmploymentCard from "@/components/profile_slides/slideThree/AddEmploymentCard";
import AddEmploymentButton from "@/components/profile_slides/slideThree/AddEmploymentButton";
import EmploymentCard from "@/components/profile_slides/slideThree/EmploymentCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function SlideTree({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  // const [employments, setEmployments] = useState([]);

  const addEmployment = (newEmployment) => {
    updateProfileInfo({
      employments: [...profileInfo.employments, newEmployment],
    });
  };

  const deleteEmployment = (indexToDelete) => {
    const filteredEmployments = profileInfo.employments.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      employments: filteredEmployments,
    });
  };

  const editEmployment = (indexToEdit, updatedEmployment) => {
    const updatedEmployments = profileInfo.employments.map(
      (employment, index) =>
        index === indexToEdit ? updatedEmployment : employment
    );
    updateProfileInfo({
      employments: updatedEmployments,
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
          <div className="text-md text-primary font-header mb-2">
              3/7 Profile
          </div>
          <h2 className="text-4xl font-bold mb-4">
              Add Your Company Employment History
          </h2>
          <p className="text-md text-greyDark mb-4">
              Highlight your formal work experience here. Roles in companies or
              organizations showcase your professional journey and expertise.
          </p>
          {profileInfo.employments.length === 0 ? (
              <div className="px-12 py-6">
                  <AddEmploymentCard addEmployment={addEmployment} />
              </div>
          ) : (
              <div className="flex flex-col sm:flex-row items-center justify-start gap-3">
                  {" "}
                  {/* Add gap for spacing and items-center for vertical alignment */}
                  <AddEmploymentButton addEmployment={addEmployment} />
                  <Carousel
                      opts={{
                          align: "start",
                      }}
                      className={
                          profileInfo.employments.length >= 3
                              ? "max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full mx-12 my-6"
                              : "max-w-sm sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-5xl w-full mx-0 my-6"
                      }
                  >
                      <CarouselContent>
                          {profileInfo.employments.map((employment, index) => (
                              <CarouselItem key={index} className="basis-1/">
                                  {/* basis-1/ ghi bah na7i el basis full li fel carousel mane9derch na7iha temak parceque ne7tajha fel job images carousel */}
                                  <EmploymentCard
                                      key={index}
                                      employment={employment}
                                      title={employment.title}
                                      currentlyIn={employment.currentlyIn}
                                      company={employment.company}
                                      location={employment.Location}
                                      startDate={`${months[employment.date.start.month - 1]} ${
                                          employment.date.start.year
                                      }`}
                                      endDate={
                                          employment.currentlyIn
                                              ? "Present"
                                              : `${months[employment.date.end.month - 1]} ${
                                                    employment.date.end.year
                                                }`
                                      }
                                      description={employment.description}
                                      onEdit={(newEmp) =>
                                          editEmployment(index, newEmp)
                                      }
                                      onDelete={() => deleteEmployment(index)}
                                      index={index}
                                  />
                              </CarouselItem>
                          ))}
                      </CarouselContent>
                      <CarouselPrevious
                          className={
                              !(profileInfo.employments.length >= 3)
                                  ? "hidden"
                                  : "top-[90px]"
                          }
                      />
                      <CarouselNext
                          className={
                              !(profileInfo.employments.length >= 3)
                                  ? " hidden"
                                  : "top-[90px]"
                          }
                      />
                  </Carousel>
              </div>
          )}
      </div>
  );
}
