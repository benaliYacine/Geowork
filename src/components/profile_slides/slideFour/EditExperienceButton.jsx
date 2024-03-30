import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Assuming you've imported the getYearsRange function and necessary UI components

import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm";
// Assuming you've imported the getYearsRange function and necessary UI components

// Define your form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
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

function EditExperienceButton({ experience, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: experience.title,
      description: experience.description,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);

    const newExperience = {
      title: values.title,

      description: values.description,
    };

    onEdit(newExperience);
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
                  Edit Experience
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <ExperienceForm />
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

export default EditExperienceButton;
