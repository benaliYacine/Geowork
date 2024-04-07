import axios from "axios";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";
import { wilayas, cities } from "@/data/wilayasCities";
// Define your schema for SlideOne
const slideOneSchema = z.object({
  wilaya: z.string().min(1, "Please select a wilaya."), // Ensure this line is correctly added
  city: z.string().min(1, "Please select a city."), // Ensure this line is correctly added
});

export default function SlideThree({
  submitFormRef,
  inc,
  jobInfo,
  updateJobInfo,
}) {
  const form = useForm({
    resolver: zodResolver(slideOneSchema),
    defaultValues: {
      wilaya: jobInfo.wilaya,
      city: jobInfo.city,
    },
  });

  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    // Watch the wilaya field for changes
    const selectedWilaya = form.watch("wilaya");

    // Filter cities based on the selected wilaya
    const citiesForWilaya = cities.filter(
      (city) => city.wilaya === selectedWilaya
    );
    setFilteredCities(citiesForWilaya);

    // Get the current value of the city field
    const currentCity = form.getValues("city");

    // Check if the current city exists in the new list of filtered cities
    const cityExists = citiesForWilaya.some(
      (city) => city.value === currentCity
    );

    // If the current city does not exist in the filtered list, reset it
    if (!cityExists) {
      form.setValue("city", "");
    }
  }, [form.watch("wilaya")]); // Dependency array to re-run the effect when the wilaya changes

  const onSubmit = form.handleSubmit((values) => {
    updateJobInfo({
      wilaya: values.wilaya,
      city: values.city,
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
            3/7 job post
          </div>
          <h2 className="text-4xl font-bold mb-4">select your job location</h2>
          <p className="text-md text-greyDark mb-4"></p>
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
        </form>
      </Form>
    </div>
  );
}
