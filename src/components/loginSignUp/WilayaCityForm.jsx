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
import PropagateLoader from "react-spinners/PropagateLoader";
import RoleFormField from "@/components/formFields/RoleFormField";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Form } from "@/components/ui/form";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { wilayas, cities } from "@/data/wilayasCities";
// Update your form schema to include the wilaya selection
const formSchema = z.object({
  wilaya: z.string().min(1, "Please select a wilaya."),
  city: z.string().min(1, "Please select a city."),
  role: z.enum(["client", "expert"], {
    required_error: "You must select a role.",
  }),
});

export default function InputWilayaCity() {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wilaya: "Algiers",
      city: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [filteredCities, setFilteredCities] = useState([]);
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        console.log("je suis la");
        const response = await axios.get("/InputWilayaCity");
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    checkLoggedIn();

    return () => {
      // Cleanup function if needed
    };
  }, [navigate]);

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

    try {
      // Replace '/continueSignup' with the actual endpoint to post the form data
      const response = await axios.post("/continueSignup", values);
      console.log("Response:", response.data);
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
        <PropagateLoader color="#FF5400" />
      </div>
    );
  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-6">
        Complete Sign Up
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <ComboBoxComponent
            control={form.control}
            name="wilaya"
            label="Wilaya"
            itemList={wilayas}
            placeholder="Select wilaya"
          />

          <ComboBoxComponent
            control={form.control}
            name="city"
            label="City"
            itemList={filteredCities}
            placeholder="Select a city"
          />

          <RoleFormField control={form.control} />
          <Button type="submit" className="w-full mt-4">
            Continue
          </Button>
        </form>
      </Form>
    </div>
  );
}
