import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign } from "lucide-react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import RatingInput from "@/components/common/RatingInput";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import TextareaFormField from "@/components/formFields/TextareaFormField";
import CloseRadioFormField from "@/components/chat/CloseRadioFormField";
// Define your form schema
const formSchema = z.object({
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
import CurrencyFormField from "@/components/formFields/CurrencyFormField";

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

function CloseJobDialog({leaveFeedback}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rating, setRating] = useState(4);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // budget: budget,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    leaveFeedback({...values,rating:rating})
    console.log("rating:", rating);
    setDialogOpen(false);
  };

  // Watch the 'type' field from the form
  const type = form.watch("type");

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Leave a Feadback
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              {/* budget */}
              <DialogHeader className="flex flex-col gap-2">
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Leave a Feadback
                </DialogTitle>

                <DialogDescription>
                  please take a moment to rate and review the client, this can
                  help future geoworkers.
                </DialogDescription>
              </DialogHeader>

              {/* {type == "close" && ( */}
              <div className=" w-full flex justify-center items-center">
                <RatingInput rating={rating} setRating={setRating} />
              </div>
              {/* )} */}
              <TextareaFormField
                control={form.control}
                name="description"
                label=""
                placeholder=""
                height="200px"
              />
              {/* Submit Button */}
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="mt-3" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="mt-3" type="submit">
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CloseJobDialog;
