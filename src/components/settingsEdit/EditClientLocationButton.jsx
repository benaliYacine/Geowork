import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wilayas, cities } from "@/data/wilayasCities";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";
// Define your form schema
const formSchema = z.object({
  streetAdress: z.string().min(1, "Street Adress is required"),
  wilaya: z.string({ required_error: "Please select a wilaya." }), // Ensure this line is correctly added
  city: z.string({ required_error: "Please select a city." }),
});

import IconButton from "@/components/common/IconButton";

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

function EditClientLocationButton({ wilaya, city, onEdit }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      wilaya: wilaya,
      city: city,
    },
  });

  
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
    onEdit(values.wilaya,values.city);
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
              {/* Title */}
              <DialogHeader>
                <DialogTitle className="font-header font-bold p-0 text-2xl">
                  Edit Account
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
                  <Button variant="outline" className="mt-3" type="button">
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

export default EditClientLocationButton;
