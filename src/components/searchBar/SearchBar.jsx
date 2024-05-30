import { Search } from "lucide-react";
import { wilayas, cities } from "@/data/wilayasCities";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { categories } from "../../data/categories";
import SearchComboBox from "@/components/searchBar/SearchComboBox";
import SearchSelect from "@/components/searchBar/SearchSelect";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Define your schema for SlideOne
const SearchBarSchema = z.object({
    category: z.string(),
    subCategory: z.string(),
    wilaya: z.string(), // Ensure this line is correctly added
    city: z.string(), // Ensure this line is correctly added
    role: z.string(),
});

export default function SearchBar({ full = false }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams.get("city"));
    const form = useForm({
        resolver: zodResolver(SearchBarSchema),
        defaultValues: {
            category: "",
            subCategory: "",
            wilaya: "",
            city: "",
            role: "Jobs",
        },
    });

    const [subCategories, setSubCategories] = useState([]);

    const [filteredCities, setFilteredCities] = useState([]);
    const navigate = useNavigate();
    let queryString = "";
    useEffect(() => {
        if (searchParams.get("city"))
            form.setValue("city", searchParams.get("city"));
        if (searchParams.get("wilaya"))
            form.setValue("wilaya", searchParams.get("wilaya"));
        if (searchParams.get("category"))
            form.setValue("category", searchParams.get("category"));
        if (searchParams.get("subCategory"))
            form.setValue("subCategory", searchParams.get("subCategory"));
    }, [location.search]);

    useEffect(() => {
        const selectedWilaya = form.watch("wilaya");
        const citiesForWilaya = cities.filter(
            (city) => city.wilaya === selectedWilaya
        );
        setFilteredCities(citiesForWilaya);

        const currentCity = form.getValues("city");
        // Check if the current subCategory exists in the new list of subCategories
        const cityExists = citiesForWilaya.some(
            (sub) => sub.value === currentCity
        );

        // If the current city does not exist in the new cities, reset it
        if (!cityExists) {
            form.setValue("city", "");
        }
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

    function navigateSearch(values) {
        if (values.category) {
            queryString += `category=${values.category}&`;
        }
        if (values.subCategory) {
            queryString += `subCategory=${values.subCategory}&`;
        }
        if (values.wilaya) {
            queryString += `wilaya=${values.wilaya}&`;
        }
        if (values.city) {
            queryString += `city=${values.city}&`;
        }
        queryString = queryString.slice(0, -1);
        console.log("queryString", queryString);
        navigate(queryString);
    }
    const onSubmit = form.handleSubmit(async (values) => {
        console.log(values); // Handle the form values, for example, saving it
        // TODO: hadnle el search
        if (values.role == "Jobs") {
            queryString = "/jobsSearch?";
            navigateSearch(values);
        } else if (values.role == "Geoworkers") {
            queryString = "/expertsSearch?";
            navigateSearch(values);
        }
    });

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn(
                    "mx-auto w-fit h-fit p-2 flex flex-col lg:flex-row gap-1 rounded-[26px] lg:rounded-full bg-white my-5 items-center transition ease-in-out duration-300 active:scale-100 hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)] ",
                    full ? "w-full" : "w-full lg:w-fit"
                )}
            >
                <SearchComboBox
                    control={form.control}
                    full={full}
                    name="category"
                    label="Category"
                    itemList={categories.map(({ value, label }) => ({
                        value,
                        label,
                    }))}
                    placeholder="Select category"
                />
                <Separator
                    orientation="vertical"
                    className="h-12 hidden lg:inline-block"
                />
                <SearchComboBox
                    full={full}
                    control={form.control}
                    name="subCategory"
                    label="Sub-Category"
                    itemList={subCategories.map(({ value, label }) => ({
                        value,
                        label,
                    }))}
                    placeholder="Select sub-category"
                />
                <Separator
                    orientation="vertical"
                    className="h-12 hidden lg:inline-block"
                />
                <SearchComboBox
                    full={full}
                    control={form.control}
                    name="wilaya"
                    label="Wilaya"
                    itemList={wilayas}
                    placeholder="Select wilaya"
                />

                <Separator
                    orientation="vertical"
                    className="h-12 hidden lg:inline-block"
                />

                <SearchComboBox
                    full={full}
                    control={form.control}
                    name="city"
                    label="City"
                    itemList={filteredCities}
                    placeholder="Select city"
                />

                <Separator
                    orientation="vertical"
                    className="h-12 hidden lg:inline-block"
                />

                <SearchSelect
                    control={form.control}
                    full={full}
                    name="role"
                    label="Role"
                    // itemList={filteredCities}
                    placeholder="Select Role"
                />

                <div className=" text-center lg:flex-none items-center flex justify-center w-full h-10 lg:h-16 lg:aspect-square lg:w-16 rounded-full bg-primary text-white hover:opacity-90 cursor-pointer transition ease-in-out duration-300 active:scale-100 hover:scale-[101%] lg:hover:scale-[107%]">
                    <button
                        type="submit"
                        className="flex justify-center items-center gap-2"
                    >
                        <Search className="lg:h-10 lg:w-10" />{" "}
                        <span className=" font-semibold lg:text-2xl lg:hidden">
                            Search
                        </span>
                    </button>
                </div>
            </form>
        </Form>
    );
}
