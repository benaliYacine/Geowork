import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@mui/material/Divider";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcGoogle } from "react-icons/fc";
import EmploymentCard from "./EmploymentCard";
import EmploymentDetailCard from "./EmploymentDetailCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import IconButton from "../common/IconButton";
const employments = [
  {
    title: "Software Engineer",
    currentlyIn: true,
    company: "Tech Innovations Inc.",
    Location: "San Francisco, CA",
    date: {
      start: { mois: 5, anee: 2018 },
      end: { mois: null, anee: null }, // Present
    },
    description: "Developing and maintaining high-traffic web applications.",
  },
  {
    title: "Senior Software Developer",
    currentlyIn: false,
    company: "Creative Solutions Ltd.",
    Location: "New York, NY",
    date: {
      start: { mois: 3, anee: 2015 },
      end: { mois: 4, anee: 2018 },
    },
    description: "Led a team of developers in creating software solutions.",
  },
  {
    title: "Web Developer",
    currentlyIn: false,
    company: "Web and Apps Studio",
    Location: "Los Angeles, CA",
    date: {
      start: { mois: 8, anee: 2012 },
      end: { mois: 2, anee: 2015 },
    },
    description: "Focused on front-end development and UX/UI design.",
  },
  {
    title: "Intern",
    currentlyIn: false,
    company: "Startup Hub",
    Location: "Austin, TX",
    date: {
      start: { mois: 6, anee: 2011 },
      end: { mois: 7, anee: 2012 },
    },
    description:
      "Gained valuable experience in software development and startup culture.",
  },
];

const employments2 = [];

// Define your schema for SlideOne
const slideOneSchema = z.object({
  roleTitle: z.string().min(1, "Role title is required"),
});

export default function SlideTree({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      roleTitle: profileInfo.roleTitle,
    },
  });

  const onSubmit = form.handleSubmit((values) => {
    updateProfileInfo({ roleTitle: values.roleTitle });
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
      <div className="text-md text-primary font-header mb-2">3/7 Profile</div>
      <h2 className="text-4xl font-bold mb-4">
        Add Your Company Employment History
      </h2>
      <p className="text-md text-greyDark mb-4">
        Highlight your formal work experience here. Roles in companies or
        organizations showcase your professional journey and expertise.
      </p>
      {employments.length === 0 ? (
        <EmploymentCard />
      ) : (
        <div className="flex flex-row items-center justify-center gap-2">
          {" "}
          {/* Add gap for spacing and items-center for vertical alignment */}
          <IconButton variant="primary" className="self-center">
            {" "}
            {/* Ensure the icon is vertically centered */}
            <Plus className="h-5 w-5" />
          </IconButton>
          <ScrollArea className="h-full w-full">
            <div className="flex w-max space-x-4 p-4">
              {employments.map((employment, index) => (
                <EmploymentDetailCard
                  key={index}
                  title={employment.title}
                  currentlyIn={employment.currentlyIn}
                  company={employment.company}
                  location={employment.Location}
                  startDate={`${employment.date.start.mois}/${employment.date.start.anee}`}
                  endDate={
                    employment.currentlyIn
                      ? "Present"
                      : `${employment.date.end.mois}/${employment.date.end.anee}`
                  }
                  description={employment.description}
                  onEdit={() => {
                    /* handle edit */
                  }}
                  onDelete={() => {
                    /* handle delete */
                  }}
                />
              ))}
            </div>
            <ScrollBar className="hidden" orientation="horizontal" />
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
