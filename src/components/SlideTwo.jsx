import axios from "axios";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { categories } from "../data/categories";

// Define your schema for SlideOne
const slideOneSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
});

export default function SlideTwo({
  submitFormRef,
  inc,
  profileInfo,
  updateProfileInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      category: profileInfo.category,
      subCategory: profileInfo.subCategory,
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
    updateProfileInfo({
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
            2/7 Profile
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Select Your Service Category
          </h2>
          <p className="text-md text-greyDark mb-4">
            Choose the category that best describe the services you offer.
          </p>
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="white"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? categories.find(
                              (Category) => Category.value === field.value
                            )?.label
                          : "Select category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-full p-0">
                    <Command>
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-72 w-48 rounded-md">
                          {categories.map((category) => (
                            <CommandItem
                              key={category.value}
                              value={category.label}
                              onSelect={() => {
                                form.setValue("category", category.value);
                              }}
                            >
                              <Check
                                className={` mr-2 h-4 w-4 ${
                                  category.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {category.label}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                      <CommandInput placeholder="Search category..." />
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subCategory"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Sub-Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="white"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? subCategories.find(
                              (subCategory) => subCategory.value === field.value
                            )?.label
                          : "Select a subCategory"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-full p-0">
                    <Command>
                      {form.getValues("category") ? ( // Check if a wilaya has been selected
                        <>
                          <CommandEmpty>No subCategory found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-max-72 w-48 rounded-md">
                              {subCategories.map((subCategory) => (
                                <CommandItem
                                  key={subCategory.value}
                                  value={subCategory.label}
                                  onSelect={() =>
                                    form.setValue(
                                      "subCategory",
                                      subCategory.value
                                    )
                                  }
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      subCategory.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {subCategory.label}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                          <CommandInput placeholder="Search subCategory..." />
                        </>
                      ) : (
                        <div className="py-4 px-2 text-center text-sm w-48">
                          Please select a category first!
                        </div>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
