import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormLabel } from "@/components/ui/form";

// Assuming you've imported the getYearsRange function and necessary UI components

import EmploymentForm from "@/components/profile_slides/slideThree/EmploymentForm";

import IconButton from "@/components/common/IconButton";

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

function EditEmploymentButton({ employment, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: employment.title,
      company: employment.company,
      Location: employment.Location,
      currentlyIn: employment.currentlyIn,
      date: {
        start: {
          // month: months[employment.date.start.month - 1],
          month: monthItems.find(
            (item) => item.value === months[employment.date.start.month - 1]
          ).value,
          year: employment.date.start.year,
        },
        end: {
          // month: months[employment.date.end.month - 1],
          month: employment.date.end.month
            ? monthItems.find(
                (item) => item.value === months[employment.date.end.month - 1]
              ).value
            : null,
          year: employment.date.end.year,
        },
      },
      description: employment.description,
    },
  });
  const currentlyIn = form.watch("currentlyIn");
  const onSubmit = async (values) => {
    console.log(values);
    // Convert the month strings to numbers for consistency with the initial structure
    const startMonthNumber = months.indexOf(values.date.start.month) + 1;
    let endMonthNumber = values.date.end.month
      ? months.indexOf(values.date.end.month) + 1
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

    onEdit(newEmployment);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton>
          <Pencil className="h-4 w-4" />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              {/* Title */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Company Employment
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <EmploymentForm />
              {/* Submit Button */}
              <DialogFooter>
                <DialogClose>
                  <Button variant="white" className="mt-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="mt-1" type="submit">
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

export default EditEmploymentButton;
