import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
// Define your form schema
const formSchema = z.object({
    budget: z
        .string()
        .min(1, "budget is required")
        // Adjust regex as needed if your input format includes the "DZD" prefix.
        .regex(/^DZD  \d{1,3}(, \d{3})*$/, "budget is required"),
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

function EditBudgetButton({ updateMessage ,jobId = "", budget = "" }) {
    const { id } = useParams();
    const [dialogOpen, setDialogOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            budget: budget,
        },
    });
    const onSubmit = async (values) => {
        let message = {
            id: id,
            message: {
                jobId: jobId,
                from: budget,
                to: values.budget,
                type: "budgetEdit",
                state:"waiting"
            },
        };
        const response = await axios.post("/addMessage",message);
        console.log("budget Edit",response.data);
        if(response.data){
          message.id=response.data._id
        }
        updateMessage(message);
        console.log(values);
        setDialogOpen(false);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <CircleDollarSign className="mr-2 stroke-[1.5px]" />
                    Send budget edit sugestion
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-0"
                        >
                            {/* budget */}
                            <DialogHeader>
                                <DialogTitle className="font-header font-bold p-0 text-2xl">
                                    Budget edit sugestion
                                </DialogTitle>
                                <DialogDescription>
                                    {/* Make changes to your profile here. Click save when you're done. */}
                                </DialogDescription>
                            </DialogHeader>
                            <CurrencyFormField
                                control={form.control}
                                name="budget"
                                label="Budget *"
                                placeholder="Enter your budget"
                            />
                            {/* Submit Button */}
                            <DialogFooter>
                                <DialogClose>
                                    <Button
                                        variant="outline"
                                        className="mt-3"
                                        type="button"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button className="mt-3" type="submit">
                                    Send
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default EditBudgetButton;
