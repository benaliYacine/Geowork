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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
      <ScrollArea className="h-full w-full">
        <div className="flex w-max space-x-4 p-4">
          <EmploymentCard />
          <EmploymentCard />
          <EmploymentCard />
          <EmploymentCard />
        </div>{" "}
        <ScrollBar className="hidden" orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
