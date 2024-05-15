import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericFormField from "@/components/formFields/GenericFormField";

import TextareaFormField from "@/components/formFields/TextareaFormField";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Assuming you've imported the getYearsRange function and necessary UI components

import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm";
// Assuming you've imported the getYearsRange function and necessary UI components

// Define your form schema
const formSchema = z.object({
  roleTitle: z.string().min(1, "Role Title is required"),
  Bio: z
    .string()
    .min(10, {
      message: "Your Bio must be at least 10 characters.",
    })
    .max(3000, {
      message: "Your Bio must not be longer than 3000 characters.",
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

function EditExperienceButton({
  roleTitle,
  Bio,
  variant = "primary",
  updateProfileInfo,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleTitle: roleTitle,
      Bio: Bio,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    const response = axios.patch('api/professionnels/changeProfileProfessionnel', values);
    console.log('response',response);
    updateProfileInfo({
      roleTitle: values.roleTitle,
    });
    updateProfileInfo({
      Bio: values.Bio,
    });

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
              {/* roleTitle */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Role Title and Bio
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <GenericFormField
                control={form.control}
                name="roleTitle"
                label="Role Title *"
                placeholder="Your new Role Title"
              />
              <TextareaFormField
                control={form.control}
                name="Bio"
                label="Your Bio *"
                placeholder="Enter your top skills, experiences, and interests. This is one of the first things clients will see on your profile.
        "
                height="180px"
              />
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

export default EditExperienceButton;
