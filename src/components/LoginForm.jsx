import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Divider from "@mui/material/Divider";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FcGoogle } from "react-icons/fc";
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export default function LoginForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get("/login");
        console.log(response.data.redirectUrl);
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        }else
        setLoading(false);
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
    setShowAlert(false);
    try {
      const response = await axios.post("/login", values);
      if (response.data.redirectUrl) {
        navigate(response.data.redirectUrl);
      }
    } catch (error) {
      // console.error("Error logging in:", error.response.data);
      setShowAlert(true);
      setAlertMessage(
        error.response.data.message || "An error occurred during login."
      ); // Adjust the message path as per your error object structure
    }
  };
  const Auth = async () => {
    window.open("http://localhost:3000/auth/google/callback");
  };
  if (loading) return (<div></div>);
  return (
    <div>
      <h2 className="text-center font-sans font-bold text-4xl mb-6">Log In</h2>
      {showAlert && (
        <Alert variant="destructive" className="mb-4">
          {" "}
          {/* Add a margin or any necessary styling */}
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{alertMessage}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Your email"
                    {...field}
                    className="w-full"
                  />
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
                  <Input
                    type="password"
                    placeholder="Your password"
                    {...field}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Continue with Email
          </Button>
        </form>
      </Form>
      <div className="my-4">
        <Divider>OR</Divider>
      </div>
      <Button variant="white" onClick={Auth} className="w-full">
        <FcGoogle className="mr-2" />
        Continue with Google
      </Button>
      <div className="text-center mt-4">
        Don't have an account?
        <Link
          to="/signup"
          className="text-primary underline-offset-4 hover:underline ml-1"
        >
          {" "}
          Sign up{" "}
        </Link>
      </div>
    </div>
  );
}
