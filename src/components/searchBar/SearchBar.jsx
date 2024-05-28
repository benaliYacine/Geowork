import { Search } from "lucide-react";
import { wilayas, cities } from "@/data/wilayasCities";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "@/components/ui/form";
import { categories } from "../../data/categories";
import SearchComboBox from "@/components/searchBar/SearchComboBox";
import SearchSelect from "@/components/searchBar/SearchSelect";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const variants = {
    large: {
        width: "100px",
        position: "absolute",
        top: "20px",
        left: "50%",
        x: "-50%",
    },
    small: {
        width: "100%",
        position: "absolute",
        top: "initial",
        left: "initial",
        x: "0",
    },
};

const SearchBarSchema = z.object({
    category: z.string(),
    subCategory: z.string(),
    wilaya: z.string(),
    city: z.string(),
    role: z.string(),
});

export default function SearchBar({ full = false }) {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
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

    const [isExpanded, setIsExpanded] = useState(false);
    const [subCategories, setSubCategories] = useState([]);
    const [filteredCities, setFilteredCities] = useState([]);
    const navigate = useNavigate();
    const searchBarRef = useRef(null);

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
        const cityExists = citiesForWilaya.some(
            (sub) => sub.value === currentCity
        );

        if (!cityExists) {
            form.setValue("city", "");
        }
    }, [form.watch("wilaya")]);

    useEffect(() => {
        const category = form.watch("category");
        const foundCategory = categories.find((c) => c.value === category);
        const newSubCategories = foundCategory?.subcategories || [];
        setSubCategories(newSubCategories);

        const currentSubCategory = form.getValues("subCategory");
        const subCategoryExists = newSubCategories.some(
            (sub) => sub.value === currentSubCategory
        );

        if (!subCategoryExists) {
            form.setValue("subCategory", "");
        }
    }, [form.watch("category")]);

    function navigateSearch(values) {
        let queryString = "";
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
        navigate(queryString);
    }

    const onSubmit = form.handleSubmit(async (values) => {
        if (values.role === "Jobs") {
            navigateSearch({ ...values, role: "jobsSearch" });
        } else if (values.role === "Geoworkers") {
            navigateSearch({ ...values, role: "expertsSearch" });
        }
    });

    const handleClickOutside = (event) => {
        if (
            searchBarRef.current &&
            !searchBarRef.current.contains(event.target)
        ) {
            setIsExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Form {...form}>
            <motion.div
                ref={searchBarRef}
                onClick={() => setIsExpanded(true)}
                layout
                data-isOpen={isExpanded}
                className={` ${isExpanded ? "w-fit h-fit absolute top-40 z-10 inset-0 mx-auto" : "w-fit mx-auto h-fit"} cursor-pointer`}
            >
                <div className="cursor-pointer">
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full flex align-middle justify-center"
                    >
                        <div
                            className={cn(
                                "w-fit h-fit p-2 flex gap-1 rounded-full bg-white items-center transition ease-in-out duration-300 active:scale-100 hover:shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)] ",
                                full && "w-full",
                                isExpanded &&
                                    "shadow-[0_0px_20px_0px_rgba(0,0,0,0.15)]",
                                !isExpanded && "p-1"
                            )}
                        >
                            <SearchComboBox
                                isExpanded={isExpanded}
                                control={form.control}
                                full={!full}
                                name="category"
                                label={isExpanded ? "Category" : ""}
                                itemList={categories.map(
                                    ({ value, label }) => ({
                                        value,
                                        label,
                                    })
                                )}
                                placeholder="Select category"
                            />
                            <Separator
                                orientation="vertical"
                                className={isExpanded ? "h-12" : "h-6"}
                            />
                            <SearchComboBox
                                isExpanded={isExpanded}
                                full={!full}
                                control={form.control}
                                name="subCategory"
                                label={isExpanded ? "Sub-Category" : ""}
                                itemList={subCategories.map(
                                    ({ value, label }) => ({
                                        value,
                                        label,
                                    })
                                )}
                                placeholder="Select sub-category"
                            />
                            <Separator
                                orientation="vertical"
                                className={isExpanded ? "h-12" : "h-6"}
                            />
                            <SearchComboBox
                                isExpanded={isExpanded}
                                full={!full}
                                control={form.control}
                                name="wilaya"
                                label={isExpanded ? "Wilaya" : ""}
                                itemList={wilayas}
                                placeholder="Select wilaya"
                            />
                            <Separator
                                orientation="vertical"
                                className={isExpanded ? "h-12" : "h-6"}
                            />
                            <SearchComboBox
                                isExpanded={isExpanded}
                                full={!full}
                                control={form.control}
                                name="city"
                                label={isExpanded ? "City" : ""}
                                itemList={filteredCities}
                                placeholder="Select city"
                            />
                            <Separator
                                orientation="vertical"
                                className={isExpanded ? "h-12" : "h-6"}
                            />
                            <div
                                onClick={() => {
                                    setIsExpanded(true);
                                }}
                            >
                                <SearchSelect
                                    isExpanded={isExpanded}
                                    control={form.control}
                                    name="role"
                                    label={isExpanded ? "Role" : ""}
                                    placeholder="Select Role"
                                />
                            </div>
                            <button type="submit">
                                <div
                                    className={cn(
                                        "text-center flex-none items-center flex justify-center aspect-square rounded-full bg-primary text-white hover:opacity-90 cursor-pointer transition ease-in-out duration-300 active:scale-100 hover:scale-[107%]",
                                        isExpanded && "w-16 h-16",
                                        !isExpanded && "w-10 h-10"
                                    )}
                                >
                                    <Search
                                        className={
                                            isExpanded ? "h-12 w-12" : "h-8 w-8"
                                        }
                                    />
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </Form>
    );
}
