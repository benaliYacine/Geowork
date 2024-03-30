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
import { Textarea } from "@/components/ui/textarea";
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
import { wilayas, cities } from "../../data/wilayasCities";
import { getYearsRange } from "../../lib/utils";
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
  Location: z.string().min(1, "Location is required"),
  currentlyIn: z.boolean().optional(), // This field is not required
  date: z.object({
    start: z.object({
      month: z.string({ required_error: "Please select a start Month." }),
      year: z.number({ required_error: "Please select a start Year." }),
    }),
    end: z.object({
      month: z.string().optional(),
      year: z.number().optional(),
    }),
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(3000, {
      message: "Description must not be longer than 3000 characters.",
    }),
});

import IconButton from "../common/IconButton";
import { Plus } from "lucide-react";
import { Pencil } from "lucide-react";
import { Trash2 } from "lucide-react";
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
import emp from "../../assets/illustrations/emp.svg";
function AddEmploymentCard({ onClick, addEmployment }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      Location: "",
      currentlyIn: false,
    },
  });
  const currentlyIn = form.watch("currentlyIn");
  const onSubmit = async (values) => {
    console.log(values);
    // Convert the month strings to numbers for consistency with the initial structure
    const startMonthNumber = months.indexOf(values.date.start.month) + 1;
    let endMonthNumber = values.date.end.month
      ? months.indexOf(values.date.end.month) + 1
      : null;

    const newEmployment = {
      title: values.title,
      company: values.company,
      Location: values.Location,
      currentlyIn: values.currentlyIn,
      date: {
        start: { month: startMonthNumber, year: values.date.start.year },
        end: { month: endMonthNumber, year: values.date.end.year },
      },
      description: values.description,
    };

    addEmployment(newEmployment); // Assuming you have destructured props
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="w-96 h-52 p-8 bg-secondaryo rounded-3xl border border-dashed border-primary cursor-pointer flex flex-col justify-center items-start gap-4 transition duration-300 ease-in-out transform active:scale-100 hover:scale-105"
          onClick={onClick}
        >
          <div className="text-foreground text-3xl font-medium font-sans capitalize leading-tight flex flex-col gap-1">
            <IconButton variant="primary">
              <Plus className="h-5 w-5" />
            </IconButton>
            Add Employment
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
              {/* Title */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Add Company Employment
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("title")}
                    placeholder="Employment title"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.title?.message}
                </FormMessage>
              </FormItem>
              {/* Company */}
              <FormItem>
                <FormLabel>Company *</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("company")}
                    placeholder="company name"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.company?.message}
                </FormMessage>
              </FormItem>
              {/* Location */}
              <FormItem>
                <FormLabel>Location *</FormLabel>
                <FormControl>
                  <Input
                    {...form.register("Location")}
                    placeholder="Employment location"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.Location?.message}
                </FormMessage>
              </FormItem>
              {/* Currently Working Checkbox */}
              <FormField
                control={form.control}
                name="currentlyIn"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex">
                        <div className="flex mt-2 space-x-2">
                          <Checkbox
                            id="currentlyIn"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            {...field}
                          />
                          <Label htmlFor="currentlyIn">
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
                    name="date.start.month"
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
                                <ScrollArea className="h-48 w-48 rounded-md">
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
                                          form.setValue(
                                            "date.start.month",
                                            month
                                          );
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
                    name="date.start.year"
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
                                <ScrollArea className="h-48 w-48 rounded-md">
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
                                            "date.start.year",
                                            year
                                          );
                                          form.setValue("startYearSearch", ""); // Clear search after selection
                                        }}
                                      >
                                        <Check
                                          className={`mr-2 h-4 w-4 ${
                                            year === +field.value
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

              {!currentlyIn && (
                <div>
                  <FormLabel>End Date</FormLabel>
                  {/* Implement End Date dropdowns similar to Start Date, but using `endMonth` and `endYear` */}
                  <div className="flex space-x-2">
                    {/* End Month Selection with Search */}
                    <FormField
                      control={form.control}
                      name="date.end.month"
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
                                  <ScrollArea className="h-48 w-48 rounded-md">
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
                                            form.setValue(
                                              "date.end.month",
                                              month
                                            );
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
                      name="date.end.year"
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
                                  <ScrollArea className="h-48 w-48 rounded-md">
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
                                              "date.end.year",
                                              year
                                            );
                                            form.setValue("endYearSearch", ""); // Clear search after selection
                                          }}
                                        >
                                          <Check
                                            className={`mr-2 h-4 w-4 ${
                                              year === +field.value
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit more about this employment"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {/* <FormDescription>
                            You can <span>@mention</span> other users and
                            organizations.
                          </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <DialogFooter>
                <DialogClose>
                  <Button variant="white" className="mt-1">
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="mt-1" type="submit">
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

export default AddEmploymentCard;
