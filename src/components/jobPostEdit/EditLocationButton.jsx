import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { wilayas, cities } from "@/data/wilayasCities";
const formSchema = z.object({
  wilaya: z.string().min(1, "Please select a wilaya."), // Ensure this line is correctly added
  city: z.string().min(1, "Please select a city."), // Ensure this line is correctly added
});

import IconButton from "@/components/common/IconButton";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";

import { Pencil } from "lucide-react";

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

function EditLocationButton({ wilaya, city, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wilaya: wilaya,
      city: city,
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

  const onSubmit = async (values) => {
    console.log(values);
    onEdit(values.wilaya, values.city);
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <IconButton variant="outlined" className="h-6 w-6 p-1">
          <Pencil className="h-4 w-4" />
        </IconButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
              {/* location */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Location
                </DialogTitle>
                <DialogDescription>
                  {/* Make changes to your profile here. Click save when you're done. */}
                </DialogDescription>
              </DialogHeader>
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
              {/* Submit Button */}
              <DialogFooter>
                <DialogClose>
                  <Button variant="outline" className="mt-3" type="button" >
                    Cancel
                  </Button>
                </DialogClose>
                <Button className="mt-3" type="submit">
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

export default EditLocationButton;
