import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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

function EditEducationButton({ education, onEdit,variant="primary" }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: education.school,
      degree: education.degree,
      fieldOfStudy: education.fieldOfStudy,

      datesAttended: {
        start: education.datesAttended.start,

        end: education.datesAttended.end,
      },
      description: education.description,
    },
  });

  const onSubmit = async (values) => {
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

    onEdit(newEducation);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton variant={variant}>
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
                  Edit Education
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

export default EditEducationButton;
