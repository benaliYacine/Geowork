import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Form, FormLabel } from "@/components/ui/form";

import { getYearsRange } from "@/lib/utils";
// Assuming you've imported the getYearsRange function and necessary UI components

import EmploymentForm from "@/components/profile_slides/slideThree/EmploymentForm";
// Assuming you've imported the getYearsRange function and necessary UI components
const monthItems = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
  { value: "April", label: "April" },
  { value: "May", label: "May" },
  { value: "June", label: "June" },
  { value: "July", label: "July" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "October", label: "October" },
  { value: "November", label: "November" },
  { value: "December", label: "December" },
];
import { ScrollArea } from "@/components/ui/scroll-area";

const currentYear = new Date().getFullYear();
const yearItems = getYearsRange(1990, currentYear);

// Define your form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  Location: z.string().min(1, "Location is required"),
  currentlyIn: z.boolean().optional(), // This field is not required
  date: z.object({
    start: z.object({
      month: z.string({ required_error: "Please select a start Month." }),
      year: z.number({ required_error: "Please select a start Year." }),
    }),
    end: z.object({
      month: z.string().optional(),
      year: z.number().optional(),
    }),
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

function AddEmploymentCard({ onClick, addEmployment }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      Location: "",
      currentlyIn: false,
    },
  });
  const currentlyIn = form.watch("currentlyIn");

  const onSubmit = async (values) => {
    console.log(values);
    // Directly use monthItems to find the index of the selected month
    const startMonthNumber =
      monthItems.findIndex((item) => item.value === values.date.start.month) +
      1;
    let endMonthNumber = values.date.end.month
      ? monthItems.findIndex((item) => item.value === values.date.end.month) + 1
      : null;

    const newEmployment = {
      title: values.title,
      company: values.company,
      Location: values.Location,
      currentlyIn: values.currentlyIn,
      date: {
        start: { month: startMonthNumber, year: values.date.start.year },
        end: { month: endMonthNumber, year: values.date.end.year },
      },
      description: values.description,
    };

    addEmployment(newEmployment); // Assuming you have destructured props
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
            Add Employment
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
                  Add Company Employment
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className=" h-[460px] w-full rounded-md">
                <EmploymentForm />
              </ScrollArea>
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

export default AddEmploymentCard;
