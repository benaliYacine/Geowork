import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";

import { FcGoogle } from "react-icons/fc";

import { Form } from "@/components/ui/form";
import PropagateLoader from "react-spinners/PropagateLoader";
import { wilayas, cities } from "@/data/wilayasCities";
import GenericFormField from "@/components/formFields/GenericFormField";
import PasswordFormField from "@/components/formFields/PasswordFormField";
import AlertMessage from "@/components/common/AlertMessage";
import RoleFormField from "@/components/formFields/RoleFormField";
import CheckboxFormField from "@/components/formFields/CheckboxFormField";
import ComboBoxComponent from "@/components/formFields/ComboBoxComponent";
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
  wilaya: z.string().min(1, "Please select a wilaya."),
  city: z.string().min(1, "Please select a city."),
  role: z.enum(["client", "expert"], {
    required_error: "You must select a role.",
  }),
});

export default function SignUpForm() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: { first: "", last: "" },
      email: "",
      password: "",
      wilaya: "Algiers",
      city: "",
    },
  });

  const [filteredCities, setFilteredCities] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const selectedWilaya = form.watch("wilaya");
    const citiesForWilaya = cities.filter(
      (city) => city.wilaya === selectedWilaya
    );
    setFilteredCities(citiesForWilaya);
    // Reset city field if wilaya changes
    form.setValue("city", "");
  }, [form.watch("wilaya")]);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/signup");
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
      console.error("Error signing up:", error.response.data);
      setShowAlert(true);
      setAlertMessage(
        error.response.data.message || "An error occurred during sign-up."
      );
    }
  };
  const Auth = async () => {
    window.location.href = "http://localhost:3000/auth/google/callback";
  };

  console.log(loading);
  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
        <PropagateLoader color="#FF5400" />
      </div>
    );

  return (
    <div>
      <h2 className="text-center font-sans font-bold text-4xl mb-6">Sign Up</h2>
      <AlertMessage
        showAlert={showAlert}
        variant="destructive"
        onClose={() => setShowAlert(false)}
        message={alertMessage}
      />

      <Button variant="white" onClick={Auth} className="w-full mb-4">
        <FcGoogle className="mr-2 h-5 w-5" />
        Continue with Google
      </Button>
      <Divider className="opacity-60">OR</Divider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="flex flex-row gap-2">
            <div className="flex-1">
              <GenericFormField
                control={form.control}
                name="name.first"
                label="First Name"
                placeholder="First name"
              />
            </div>
            <div className="flex-1">
              <GenericFormField
                control={form.control}
                name="name.last"
                label="Last Name"
                placeholder="Last name"
              />
            </div>
          </div>
          <GenericFormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your email"
          />
          <PasswordFormField control={form.control} name="password" />
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
          <CheckboxFormField
            control={form.control}
            name="termsOfService"
            label="Yes, I understand and agree to the Terms of Service"
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
