import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
// Define your form schema
const formSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: "Your description must be at least 10 characters.",
    })
    .max(3000, {
      message: "Your description must not be longer than 3000 characters.",
    }),
});

import IconButton from "@/components/common/IconButton";
import TextareaFormField from "@/components/formFields/TextareaFormField";

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

function EditDescriptionButton({ description, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: description,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    onEdit(values.description);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton variant="outlined" className="h-6 w-6 p-1">
          <Pencil className="h-4 w-4" />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              {/* description */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Description
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <TextareaFormField
                control={form.control}
                name="description"
                label="Job description *"
                placeholder="Already have a description? Paste it here!"
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

export default EditDescriptionButton;
