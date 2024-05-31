import React from "react";
import Pass from "@/assets/illustrations/Pass.svg"; // Ensure correct path
import AlertMessage from "@/components/common/AlertMessage";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";

import axios from "axios";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import ExperienceForm from "@/components/profile_slides/slideFour/ExperienceForm"
import GenericFormField from "@/components/formFields/GenericFormField";
import PhoneFormField from "@/components/formFields/PhoneFormField";
import PasswordFormField from "@/components/formFields/PasswordFormField";
import { Separator } from "@/components/ui/separator";
// Define your form schema
const formSchema = z
    .object({
       
        newPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
        confirmPassword: z
            .string()
            .min(8, { message: "Password must be at least 8 characters long" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "New password and confirmation password must match",
        path: ["confirmPassword"], // This helps attach the error message to the ConfirmPassword field
    });

import IconButton from "@/components/common/IconButton";

import { Pencil } from "lucide-react";

const ChangePassword = () => {
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [emailAddress, setEmailAddress] = useState("");

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            
            newPassword: "",
            confirmPassword: "",
        },
    });

    const onSubmit = async (values) => {
        console.log(values);
        // const response = await axios.post("/verifyOldPassword", {
        //     oldPassword: values.oldPassword,
        //     password: password,
        // });
        // console.log(response.data.passwordVerify);
        // if (response.data)
        //     if (!response.data.passwordVerify) {
        //         // Manually set the error for the OldPassword field
        //         form.setError("oldPassword", {
        //             type: "manual",
        //             message: "Your old password was incorrect.",
        //         });
        //         return;
        //     }
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("/verifyEmail");
    //             console.log(response.data);
    //             if (response.data.redirectUrl) {
    //                 navigate(response.data.redirectUrl);
    //             }
    //             if (response.data.emailAddress)
    //                 setEmailAddress(response.data.emailAddress);
    //             console.log(emailAddress);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error(error);
    //             // Handle error here, if needed
    //         }
    //     };

    //     fetchData();
    // }, []);
    const [sending, setSending] = useState(false);
    const handleSendPasswordEmail = async () => {
        setShowAlert(false);
        setSending(true);
        // const response = await axios.post("/verifyEmail");
        // console.log(response);
        // if (response.data.redirectUrl) {
        //     navigate(response.data.redirectUrl);
        // }
        // if (!response.data.error) {
        setShowAlert(true);
        // }
        setSending(false);
    };
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-bg">
            <div className="w-full max-w-md px-3 py-8">
                <AlertMessage
                    className="mt-4"
                    showAlert={showAlert}
                    message="New password reset email is successfully sent. Please, check your email... "
                    variant="success" // or "success" for success alerts
                    onClose={() => setShowAlert(false)} // Assuming `setShowAlert` is your state setter
                />

                <div>
                    <h2 className="text-center font-sans font-bold text-4xl mb-6">
                        Change Password
                    </h2>

                    <div>
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4"
                            >
                               
                                <PasswordFormField
                                    control={form.control}
                                    name="newPassword"
                                    label="New password"
                                    placeholder=""
                                />
                                <PasswordFormField
                                    control={form.control}
                                    name="confirmPassword"
                                    label="Confirm New Password"
                                    placeholder=""
                                    canTogleVisibility={false}
                                />
                                {/* Submit Button */}
                                <Button type="submit" className="w-full">
                                    Save
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
