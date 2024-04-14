import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
// Define your form schema
const formSchema = z.object({
  invitationMessage: z
    .string()
    .min(10, {
      message: "Your invitation message must be at least 10 characters.",
    })
    .max(3000, {
      message:
        "Your invitation message must not be longer than 3000 characters.",
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

function SendInvitation({ name = "Yacine", expert }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      invitationMessage: `Hello! \n\n I'd like to invite you to take a look at the job I've posted. \n\n ${name}.`,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    // TODO: handle send invitation message
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Invite to Job
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              {/* invitationMessage */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Invite To Job
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              {/* the expert info  jebtha men expert item w na7iit l separator l rating l location ..div w styles manehtajhoumch ...*/}
              <div className="flex flex-row p-2 w-full mr-auto">
                <Avatar className="mr-2">
                  <AvatarImage src={expert.avatarUrl} alt={expert.name} />
                  <AvatarFallback>{expert.initials}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold mb-1">{expert.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">{expert.role}</p>
                </div>
              </div>

              <TextareaFormField
                control={form.control}
                name="invitationMessage"
                label="Message *"
                placeholder="Already have a message? Paste it here!"
                minHeight="180px"
              />
              {/* Submit Button */}
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="mt-3" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="mt-3" type="submit">
                Send invitaion
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SendInvitation;
