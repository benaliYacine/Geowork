import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
import PhoneFormField from "@/components/formFields/PhoneFormField";
import PasswordFormField from "@/components/formFields/PasswordFormField";
import { Separator } from "@/components/ui/separator";
// Define your form schema
const formSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirmation password must match",
    path: ["confirmPassword"], // This helps attach the error message to the ConfirmPassword field
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

function EditAccountButton({ password, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    if (values.oldPassword !== password) {
      // Manually set the error for the OldPassword field
      form.setError("oldPassword", {
        type: "manual",
        message: "Your old password was incorrect.",
      });
      return;
    }

    onEdit(values.confirmPassword);
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
              {/* Title */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Password
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                <PasswordFormField
                  control={form.control}
                  name="oldPassword"
                  label="Old Password"
                  className="mb-4"
                  placeholder=""
                  canTogleVisibility={false}
                />

                <PasswordFormField
                  control={form.control}
                  name="newPassword"
                  label="New password"
                  placeholder=""
                />
                <PasswordFormField
                  control={form.control}
                  name="confirmPassword"
                  label="Confirm New Password"
                  placeholder=""
                  canTogleVisibility={false}
                />
              </div>
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

export default EditAccountButton;
