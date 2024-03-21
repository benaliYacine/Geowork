import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from 'axios';
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
      password: ""
    },
  });
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get('/login');
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    checkLoggedIn();

    return () => {
      // Cleanup function if needed
    };
  }, [navigate]);

  const onSubmit = async (values) => {
    try {
      const response = await axios.post('/login', values);
      if (response.data.redirectUrl) {
        navigate(response.data.redirectUrl);
      }
    } catch (error) {
      console.error('Error logging in:', error.response.data); //hna ki tkon email or password incorrect mbed nzidoha
    }
  };

  return (
    <div>
      <h2 className="text-3xl text-center font-semibold mb-6">Log In</h2>
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
      <Button variant="outline" className="w-full">
        Continue with Google
      </Button>
      <div className="text-center mt-4">
        Don't have an account?
        <Link to="/signup" className="text-primary underline-offset-4 hover:underline ml-1"> Sign up </Link>
      </div>
    </div>
  );
}