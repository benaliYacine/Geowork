import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { Form } from "@/components/ui/form";

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

function AddExperienceButton({ addExperience }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // title: "",
      // description: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);

    const newExperience = {
      title: values.title,
      description: values.description,
    };

    addExperience(newExperience); // Assuming you have destructured props
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
                  Add Experience
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

export default AddExperienceButton;
