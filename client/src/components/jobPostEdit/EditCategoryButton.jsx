import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categories } from "@/data/categories";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
// Define your form schema
const formSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
});

import IconButton from "@/components/common/IconButton";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";

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

function EditCategoryButton({ category, subCategory, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: category,
      subCategory: subCategory,
    },
  });

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

  const onSubmit = async (values) => {
    console.log(values);
    onEdit(values.category, values.subCategory);
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
              {/* category */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Category
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
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

export default EditCategoryButton;
