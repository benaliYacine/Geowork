import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";

import { getYearsRange } from "@/lib/utils";
// Assuming you've imported the getYearsRange function and necessary UI components

import EducationForm from "@/components/profile_slides/slideFive/EducationForm";

const currentYear = new Date().getFullYear();
const yearItems = getYearsRange(1990, currentYear);

// Define your form schema
const formSchema = z.object({
  school: z.string().min(1, "school is required"),
  degree: z.string().min(1, "degree is required"),
  fieldOfStudy: z.string().min(1, "fieldOfStudy is required"),
  datesAttended: z.object({
    start: z.number({ required_error: "Please select a start Year." }),
    end: z.number({ required_error: "Please select an end Year." }),
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(3000, {
      message: "Description must not be longer than 3000 characters.",
    }),
});

import IconButton from "../../common/IconButton";
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
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

function AddEducationCard({ onClick, addEducation }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // school: "",
      // degree: "",
      // fieldOfStudy: "",
      // description:
      //   "",
      },
  });

  const onSubmit = async (values) => {
    console.log("add submit");
    
    console.log(values);

    const newEducation = {
      school: values.school,
      degree: values.degree,
      fieldOfStudy: values.fieldOfStudy,
      datesAttended: {
        start: values.datesAttended.start,
        end: values.datesAttended.end,
      },
      description: values.description,
    };

    addEducation(newEducation); // Assuming you have destructured props
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-96 h-52 p-8 bg-secondaryo rounded-3xl border border-dashed border-primary cursor-pointer flex flex-col justify-center items-start gap-4 transition duration-300 ease-in-out transform active:scale-100 hover:scale-105"
          onClick={onClick}
        >
          <div className="text-foreground text-3xl font-medium font-sans capitalize leading-tight flex flex-col gap-1">
            <IconButton variant="primary">
              <Plus className="h-5 w-5" />
            </IconButton>
            Add Education
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              {/* Title */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Add Education
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <EducationForm />
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

export default AddEducationCard;
