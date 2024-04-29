import { Search } from "lucide-react";
import { wilayas, cities } from "@/data/wilayasCities";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { categories } from "../../data/categories";
import SearchComponent from "@/components/common/SearchComponent";
import { Separator } from "@/components/ui/separator";

// Define your schema for SlideOne
const SearchBarSchema = z.object({
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
});

export default function SearchBar({}) {
  const form = useForm({
    resolver: zodResolver(SearchBarSchema),
    defaultValues: {
      category: "",
      subCategory: "",
      wilaya: "",
    },
  });

  const [subCategories, setSubCategories] = useState([]);

  const [filteredCities, setFilteredCities] = useState([]);
  
  useEffect(() => {
    const selectedWilaya = form.watch("wilaya");
    const citiesForWilaya = cities.filter(
      (city) => city.wilaya === selectedWilaya
    );
    setFilteredCities(citiesForWilaya);
    // Reset city field if wilaya changes
    form.setValue("city", undefined);
  }, [form.watch("wilaya")]);


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
    console.log(values); // Handle the form values, for example, saving it
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex align-middle justify-center"
      >
        <div className="w-fit h-fit p-2 flex gap-1 shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)] rounded-full bg-white m-4 items-center transition ease-in-out duration-300 active:scale-100 hover:shadow-[0_0px_30px_0px_rgba(0,0,0,0.25)]">
          <SearchComponent
            control={form.control}
            name="category"
            label="Category"
            itemList={categories.map(({ value, label }) => ({
              value,
              label,
            }))}
            placeholder="Select category"
          />
          <Separator orientation="vertical" className="h-12" />
          <SearchComponent
            control={form.control}
            name="subCategory"
            label="Sub-Category"
            itemList={subCategories.map(({ value, label }) => ({
              value,
              label,
            }))}
            placeholder="Select sub-category"
          />
          <Separator orientation="vertical" className="h-12" />
          <SearchComponent
            control={form.control}
            name="wilaya"
            label="Wilaya"
            itemList={wilayas}
            placeholder="Select wilaya"
          />
          <Separator orientation="vertical" className="h-12" />
          <SearchComponent
            control={form.control}
            name="city"
            label="City"
            itemList={filteredCities}
            placeholder="Select city"
          />

          <div className=" text-center flex-none items-center flex justify-center  aspect-square w-16 rounded-full bg-primary text-white hover:opacity-90 cursor-pointer transition ease-in-out duration-300 active:scale-100 hover:scale-105">
            <Search className="h-10 w-10" />
          </div>
        </div>
      </form>
    </Form>
  );
}
