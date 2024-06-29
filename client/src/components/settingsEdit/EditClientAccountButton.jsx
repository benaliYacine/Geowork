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
    name: z.object({
        first: z.string().min(1, { message: "First name is required" }),
        last: z.string().min(1, { message: "Last name is required" }),
    }),
    email: z.string().email({ message: "Invalid email address" }),
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

function EditClientAccountButton({ name, email, edit, onEdit }) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: { first: name.first, last: name.last },
            email: email,
        },
    });
    const onSubmit = async (values) => {
        console.log(values);
        onEdit(values.name, values.email);
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
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-0"
                        >
                            {/* Title */}
                            <DialogHeader>
                                <DialogTitle className="font-header font-bold p-0 text-2xl">
                                    Edit Account
                                </DialogTitle>
                                <DialogDescription>
                                    {/* Make changes to your profile here. Click save when you're done. */}
                                </DialogDescription>
                            </DialogHeader>
                            <GenericFormField
                                className="w-full"
                                control={form.control}
                                name="name.first"
                                label="First Name"
                                placeholder="First name"
                            />
                            <GenericFormField
                                className="w-full"
                                control={form.control}
                                name="name.last"
                                label="Last Name"
                                placeholder="Last name"
                            />
                            {edit && (
                                <GenericFormField
                                    control={form.control}
                                    name="email"
                                    label="Email"
                                    placeholder="Your email"
                                />
                            )}

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

export default EditClientAccountButton;
