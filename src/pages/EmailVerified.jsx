import React from "react";
import { Button } from "@/components/ui/button";
import mail_sent from "@/assets/illustrations/mail_sent.svg"; // Ensure correct path
import AlertMessage from "@/components/common/AlertMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import { Link } from "react-router-dom";

const EmailVerified = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    return (
        <PageContainer>
            <div className="text-center py-20 sm:py-24">
                <img
                    src={mail_sent}
                    alt="Email Sent"
                    className="mx-auto w-1/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                />
                <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Your email was verified successfully
                </h1>
                <p className="mt-6 text-base leading-7 text-greyDark">
                    {/* Your email was verified successfully <br /> */}
                    {/* Please check your email and select the link provided to
                    verify your address. */}
                </p>
                <div className="mt-6 w-full flex justify-center">
                    <Link to="/" className="rounded-md shadow-sm">
                        <Button variant="default">Go back home</Button>
                    </Link>
                </div>
            </div>
        </PageContainer>
    );
};

export default EmailVerified;
