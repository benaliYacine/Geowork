import axios from "axios";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { categories } from "../../data/categories";
import ComboBoxComponent from "@/components/ComboBoxComponent";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
});

export default function SlideTwo({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      category: jobInfo.category,
      subCategory: jobInfo.subCategory,
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

  const onSubmit = form.handleSubmit((values) => {
    updateJobInfo({
      category: values.category,
      subCategory: values.subCategory,
    });
    inc(); // gedem el slide id al form valid
    // Proceed with your onSave logic or form values handling here
    console.log(values); // Handle the form values, for example, saving it
  });

  // Use useEffect to update submitFormRef with onSubmit function
  useEffect(() => {
    submitFormRef.current = onSubmit; // Allows the parent to trigger form submission
  }, [submitFormRef, onSubmit]);

  return (
    <div className="  ">
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="text-md text-primary font-header mb-2">
            2/7 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">Select Your job Category</h2>
          <p className="text-md text-greyDark mb-4">
            Choose the category that best describe the services you need.
          </p>
          <ComboBoxComponent
            control={form.control}
            name="category"
            label="Category"
            itemList={categories.map(({ value, label }) => ({ value, label }))}
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
        </form>
      </Form>
    </div>
  );
}
