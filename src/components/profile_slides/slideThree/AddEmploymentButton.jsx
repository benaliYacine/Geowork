import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { Form, FormLabel } from "@/components/ui/form";

import { getYearsRange } from "@/lib/utils";

import IconButton from "@/components/common/IconButton";
import { Plus } from "lucide-react";

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

function AddEmploymentButton({ addEmployment }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // title: "",
      // company: "",
      // Location: "",
      // currentlyIn: false,
      // date: {
      //   start: {
      //     month: "",
      //     year: "2020",
      //   },
      //   end: {
      //     month: "",
      //     year: "2021",
      //   },
      // },
      // description: "",
    },
  });

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
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton variant="primary" className="self-center">
          {" "}
          {/* Ensure the icon is vertically centered */}
          <Plus className="h-5 w-5" />
        </IconButton>
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

export default AddEmploymentButton;
