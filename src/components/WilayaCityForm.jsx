import axios from "axios";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
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
import { wilayas, cities } from "../data/wilayasCities";
// Update your form schema to include the wilaya selection
const formSchema = z.object({
  
  wilaya: z.string({ required_error: "Please select a wilaya." }), // Ensure this line is correctly added
  city: z.string({ required_error: "Please select a city." }), // Ensure this line is correctly added
  role: z.enum(["client", "expert"], {
    required_error: "You must select a role.",
  }),
});

export default function InputWilayaCity() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wilaya: "",
      city: "",
    },
  });

  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    const selectedWilaya = form.watch("wilaya");
    const citiesForWilaya = cities.filter(
      (city) => city.wilaya === selectedWilaya
    );
    setFilteredCities(citiesForWilaya);
    // Reset city field if wilaya changes
    form.setValue("city", "");
  }, [form.watch("wilaya")]);




  const onSubmit = async (values) => {
    console.log(values);
    // TODO 
    // const formData = new FormData(event.target);
    // const wilaya = formData.get('wilaya');
    // const city = formData.get('city');
    // const type = formData.get('type');

    // try {
    //   // Replace '/continueSignup' with the actual endpoint to post the form data
    //   const response = await axios.post('/continueSignup', { wilaya, city, type });
    //   if (response.data.redirectUrl) {
    //     window.location.href = response.data.redirectUrl;
    //   }
    //   console.log('Response:', response.data);
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-6">7ot title l page hadi hna</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">

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
                <FormLabel>City</FormLabel>
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
          
          <Button type="submit" className="w-full mt-4">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}

