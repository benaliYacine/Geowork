import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { Check, Eye, EyeOff, ChevronsUpDown } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcGoogle } from "react-icons/fc";
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
import { wilayas, cities } from "../data/wilayasCities";
import { getYearsRange } from "../lib/utils";
// Assuming you've imported the getYearsRange function and necessary UI components
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const currentYear = new Date().getFullYear();
const years = getYearsRange(1990, currentYear);


// Define your form schema
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  location: z.string().min(1, "Location is required"),
  currentlyWorking: z.boolean().optional(), // This field is not required
  startMonth: z.string({ required_error: "Please select a start Month." }),
  startYear: z.string({ required_error: "Please select a start Year." }),
  endMonth: z.string().optional(),
  endYear: z.string().optional(),
});

export default function EmploymentForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      currentlyWorking: false,
    },
  });
  const currentlyWorking = form.watch("currentlyWorking");
  const onSubmit = async (values) => {
    console.log(values);
    // Handle form submission, e.g., posting to an API
  };

  return (
    <div>
      <h2 className="text-center font-sans font-bold text-4xl mb-6">
        Employment Form
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Title */}
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input {...form.register("title")} placeholder="Your title" />
            </FormControl>
            <FormMessage>{form.formState.errors.title?.message}</FormMessage>
          </FormItem>
          {/* Company */}
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...form.register("company")} placeholder="Your company" />
            </FormControl>
            <FormMessage>{form.formState.errors.company?.message}</FormMessage>
          </FormItem>
          {/* Location */}
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input
                {...form.register("location")}
                placeholder="Your location"
              />
            </FormControl>
            <FormMessage>{form.formState.errors.location?.message}</FormMessage>
          </FormItem>
          {/* Currently Working Checkbox */}
          <FormField
            control={form.control}
            name="currentlyWorking"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex">
                    <div className="flex space-x-2">
                      <Checkbox
                        id="currentlyWorking"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
                      />
                      <Label htmlFor="currentlyWorking">
                        I am currently working in this role
                      </Label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Start Date *</FormLabel>
            <div className="flex space-x-2">
              {/* Month Selection with Search */}
              <FormField
                control={form.control}
                name="startMonth"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="white"
                            role="combobox"
                            className="w-full justify-between hover:scale-100 rounded-md"
                          >
                            {field.value || "Select Month"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-full p-0">
                        <Command>
                          <CommandEmpty>No month found.</CommandEmpty>

                          <CommandGroup>
                            <ScrollArea className="h-max-72 w-48 rounded-md">
                              {months
                                .filter((month) =>
                                  month
                                    .toLowerCase()
                                    .includes(
                                      form
                                        .watch("startMonthSearch")
                                        ?.toLowerCase() || ""
                                    )
                                )
                                .map((month, index) => (
                                  <CommandItem
                                    key={index}
                                    value={month}
                                    onSelect={() => {
                                      form.setValue("startMonth", month);
                                      form.setValue("startMonthSearch", ""); // Clear search after selection
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        month === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {month}
                                  </CommandItem>
                                ))}
                            </ScrollArea>
                          </CommandGroup>
                          <CommandInput placeholder="Search month..." />
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Year Selection with Search */}
              <FormField
                control={form.control}
                name="startYear"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="white"
                            role="combobox"
                            className="w-full justify-between hover:scale-100 rounded-md"
                          >
                            {field.value || "Select Year"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col w-full p-0">
                        <Command>
                          <CommandEmpty>No year found.</CommandEmpty>

                          <CommandGroup>
                            <ScrollArea className="h-max-72 w-48 rounded-md">
                              {years
                                .filter((year) =>
                                  year
                                    .toString()
                                    .startsWith(
                                      form.watch("startYearSearch") || ""
                                    )
                                )
                                .map((year) => (
                                  <CommandItem
                                    key={year}
                                    value={year.toString()}
                                    onSelect={() => {
                                      form.setValue(
                                        "startYear",
                                        year.toString()
                                      );
                                      form.setValue("startYearSearch", ""); // Clear search after selection
                                    }}
                                  >
                                    <Check
                                      className={`mr-2 h-4 w-4 ${
                                        year.toString() === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      }`}
                                    />
                                    {year}
                                  </CommandItem>
                                ))}
                            </ScrollArea>
                          </CommandGroup>
                          <CommandInput placeholder="Search year..." />
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {!currentlyWorking && (
            <div>
              <FormLabel>End Date *</FormLabel>
              {/* Implement End Date dropdowns similar to Start Date, but using `endMonth` and `endYear` */}
              <div className="flex space-x-2">
                {/* End Month Selection with Search */}
                <FormField
                  control={form.control}
                  name="endMonth"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="white"
                              role="combobox"
                              className="w-full justify-between hover:scale-100 rounded-md"
                            >
                              {field.value || "Select Month"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-full p-0">
                          <Command>
                            <CommandEmpty>No month found.</CommandEmpty>

                            <CommandGroup>
                              <ScrollArea className="h-max-72 w-48 rounded-md">
                                {months
                                  .filter((month) =>
                                    month
                                      .toLowerCase()
                                      .includes(
                                        form
                                          .watch("endMonthSearch")
                                          ?.toLowerCase() || ""
                                      )
                                  )
                                  .map((month, index) => (
                                    <CommandItem
                                      key={index}
                                      value={month}
                                      onSelect={() => {
                                        form.setValue("endMonth", month);
                                        form.setValue("endMonthSearch", ""); // Clear search after selection
                                      }}
                                    >
                                      <Check
                                        className={`mr-2 h-4 w-4 ${
                                          month === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                      {month}
                                    </CommandItem>
                                  ))}
                              </ScrollArea>
                            </CommandGroup>
                            <CommandInput placeholder="Search month..." />
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Year Selection with Search */}
                <FormField
                  control={form.control}
                  name="endYear"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="white"
                              role="combobox"
                              className="w-full justify-between hover:scale-100 rounded-md"
                            >
                              {field.value || "Select Year"}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col w-full p-0">
                          <Command>
                            <CommandEmpty>No year found.</CommandEmpty>

                            <CommandGroup>
                              <ScrollArea className="h-max-72 w-48 rounded-md">
                                {years
                                  .filter((year) =>
                                    year
                                      .toString()
                                      .startsWith(
                                        form.watch("endYearSearch") || ""
                                      )
                                  )
                                  .map((year) => (
                                    <CommandItem
                                      key={year}
                                      value={year.toString()}
                                      onSelect={() => {
                                        form.setValue(
                                          "endYear",
                                          year.toString()
                                        );
                                        form.setValue("endYearSearch", ""); // Clear search after selection
                                      }}
                                    >
                                      <Check
                                        className={`mr-2 h-4 w-4 ${
                                          year.toString() === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        }`}
                                      />
                                      {year}
                                    </CommandItem>
                                  ))}
                              </ScrollArea>
                            </CommandGroup>
                            <CommandInput placeholder="Search year..." />
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {/* Submit Button */}
          <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
