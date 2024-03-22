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
import { wilayas, cities } from "./data/wilayasCities";
// Update your form schema to include the wilaya selection
const formSchema = z.object({
  name: z.object({
    first: z.string().min(1, { message: "First name is required" }),
    last: z.string().min(1, { message: "Last name is required" }),
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),

  termsOfService: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms of service."),
  wilaya: z.string({ required_error: "Please select a wilaya." }), // Ensure this line is correctly added
  city: z.string({ required_error: "Please select a city." }), // Ensure this line is correctly added
  role: z.enum(["client", "expert"], {
    required_error: "You must select a role.",
  }),
});

export default function SignUpForm() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: { first: "", last: "" },
      email: "",
      password: "",
      wilaya: "",
      city: "",
    },
  });

  const [filteredCities, setFilteredCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const selectedWilaya = form.watch("wilaya");
    const citiesForWilaya = cities.filter(
      (city) => city.wilaya === selectedWilaya
    );
    setFilteredCities(citiesForWilaya);
    // Reset city field if wilaya changes
    form.setValue("city", "");
  }, [form.watch("wilaya")]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/signup");
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    checkLoggedIn();

    return () => {
      // Cleanup function if needed
    };
  }, [navigate]);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      
      let response;
      if (values.role == "client") {
        delete values.role;
        console.log(values);
        response = await axios.post("/api/clients/createClient", values);
      } else if (values.role == "expert") {
        delete values.role;
        console.log(values);
        response = await axios.post(
          "/api/professionnels/createProfessionnel",
          values
        );
      }
      if (response.data.redirectUrl) {
        console.log(response.data.redirectUrl);
        navigate(response.data.redirectUrl);
      }
    } catch (error) {
      console.error('Error logging in:', error.response.data); //error data email exist deja
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-6">Sign Up</h2>
      <Button variant="outline" className="w-full mb-4">
        Continue with Google
      </Button>
      <Divider className="opacity-60">OR</Divider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="name.first"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="First name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name.last"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Your password"
                      {...field}
                      className="w-full pr-10"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-2">
                      {showPassword ? (
                        <Eye
                          className="m-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={togglePasswordVisibility}
                        />
                      ) : (
                        <EyeOff
                          className="m-2 h-4 w-4 shrink-0 opacity-50"
                          onClick={togglePasswordVisibility}
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wilaya"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Wilaya</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? wilayas.find(
                              (wilaya) => wilaya.value === field.value
                            )?.label
                          : "Select wilaya"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-full p-0">
                    <Command>
                      <CommandEmpty>No wilaya found.</CommandEmpty>
                      <CommandGroup>
                        <ScrollArea className="h-72 w-48 rounded-md">
                          {wilayas.map((wilaya) => (
                            <CommandItem
                              key={wilaya.value}
                              value={wilaya.label}
                              onSelect={() => {
                                form.setValue("wilaya", wilaya.value);
                              }}
                            >
                              <Check
                                className={` mr-2 h-4 w-4 ${
                                  wilaya.value === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                }`}
                              />
                              {wilaya.label}
                            </CommandItem>
                          ))}
                        </ScrollArea>
                      </CommandGroup>
                      <CommandInput placeholder="Search wilaya..." />
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Cities</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className="w-full justify-between"
                      >
                        {field.value
                          ? filteredCities.find(
                              (city) => city.value === field.value
                            )?.label
                          : "Select a city"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col w-full p-0">
                    <Command>
                      {form.getValues("wilaya") ? ( // Check if a wilaya has been selected
                        <>
                          <CommandEmpty>No city found.</CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-max-72 w-48 rounded-md">
                              {filteredCities.map((city) => (
                                <CommandItem
                                  key={city.value}
                                  value={city.label}
                                  onSelect={() =>
                                    form.setValue("city", city.value)
                                  }
                                >
                                  <Check
                                    className={`mr-2 h-4 w-4 ${
                                      city.value === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                  />
                                  {city.label}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                          <CommandInput placeholder="Search city..." />
                        </>
                      ) : (
                        <div className="py-6 text-center text-sm w-48">
                          Please select a wilaya first!
                        </div>
                      )}
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center mt-4">
                <FormLabel>I am:</FormLabel>
                <div className="mt-2">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <div className="flex">
                      <div
                        className={cn(
                          "cursor-pointer space-x-2 flex items-center justify-center px-4 py-2 border text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                          field.value === "client"
                            ? "bg-gray-200 border-black rounded-l-full"
                            : "bg-white border-black rounded-l-full"
                        )}
                      >
                        <RadioGroupItem value="client" id="client" />
                        <Label htmlFor="client">A Client</Label>
                      </div>
                      <div
                        className={cn(
                          "cursor-pointer flex items-center space-x-2 justify-center px-4 py-2 border-t border-b border-r text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2",
                          field.value === "expert"
                            ? "bg-gray-200 border-black rounded-r-full"
                            : "bg-white border-black rounded-r-full"
                        )}
                      >
                        {" "}
                        <RadioGroupItem value="expert" id="expert" />
                        <Label htmlFor="expert">An Expert</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="termsOfService"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex justify-center">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="terms"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        {...field}
                      />
                      <Label htmlFor="terms">
                        Yes, I understand and agree to the Terms of Service
                      </Label>
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Sign Up
          </Button>
          <div className="text-center mt-4">
            Already have an ccount?
            <Link
              to="/login"
              className="text-primary underline-offset-4 hover:underline ml-1"
            >
              {" "}
              Log in{" "}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
