import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GenericFormField from "@/components/formFields/GenericFormField";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";

import TextareaFormField from "@/components/formFields/TextareaFormField";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { categories } from "../../data/categories";
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
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
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
  category,
  subCategory,
  variant = "primary",
  updateProfileInfo,
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roleTitle: roleTitle,
      Bio: Bio,
      category: category,
      subCategory: subCategory,
    },
  });
  const onSubmit = async (values) => {
    console.log(values);
    const response = axios.patch(
      "api/professionnels/changeProfileProfessionnel",
      values
    );
    console.log("response", response);
    updateProfileInfo({
      roleTitle: values.roleTitle,
    });
    updateProfileInfo({
      Bio: values.Bio,
    });
    updateProfileInfo({
      category: values.category,
    });
    updateProfileInfo({
      subCategory: values.subCategory,
    });

    setDialogOpen(false);
  };

  const [subCategories, setSubCategories] = useState([]);

  // Update sub-categories when the category changes
  useEffect(() => {
    const category = form.watch("category");
    const foundCategory = categories.find((c) => c.value === category);
    const newSubCategories = foundCategory?.subcategories || [];
    setSubCategories(newSubCategories);

    const currentSubCategory = form.getValues("subCategory");
    // Check if the current subCategory exists in the new list of subCategories
    const subCategoryExists = newSubCategories.some(
      (sub) => sub.value === currentSubCategory
    );

    // If the current subCategory does not exist in the new category, reset it
    if (!subCategoryExists) {
      form.setValue("subCategory", "");
    }
  }, [form.watch("category")]);

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
              <ComboBoxComponent
                control={form.control}
                name="category"
                label="Category"
                itemList={categories.map(({ value, label }) => ({
                  value,
                  label,
                }))}
                placeholder="Select category"
              />
              <ComboBoxComponent
                control={form.control}
                name="subCategory"
                label="Sub-Category"
                itemList={subCategories.map(({ value, label }) => ({
                  value,
                  label,
                }))}
                placeholder="Select sub-category"
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
