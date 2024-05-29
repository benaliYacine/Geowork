import React from "react";
import { Button } from "@/components/ui/button";
import mail_sent from "@/assets/illustrations/mail_sent.svg"; // Ensure correct path
import AlertMessage from "@/components/common/AlertMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
const SendEmailPage = () => {
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [emailAddress, setEmailAddress] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/verifyEmail");
                console.log(response.data);
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                }
                if (response.data.emailAddress)
                    setEmailAddress(response.data.emailAddress);
                setLoading(false);
            } catch (error) {
                console.error(error);
                // Handle error here, if needed
            }
        };

        fetchData();
    }, []);
    const [sending, setSending] = useState(false)
    const handleSendVerifyEmail = async () => {
        setShowAlert(false);
        setSending(true)
        const response = await axios.post("/verifyEmail");
        console.log(response);
        if (response.data.redirectUrl) {
            navigate(response.data.redirectUrl);
        }
        if (!response.data.error) {
            setShowAlert(true);
        }
        setSending(false);
    };
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    return (
        <PageContainer>
            <AlertMessage
                className="mt-4"
                showAlert={showAlert}
                message="New verification email is successfully sent. Please, check your email..."
                variant="success" // or "success" for success alerts
                onClose={() => setShowAlert(false)} // Assuming `setShowAlert` is your state setter
            />

            <div className="text-center py-20 sm:py-24">
                <img
                    src={mail_sent}
                    alt="Email Sent"
                    className="mx-auto w-1/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
                />
                <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Verify your email to continue
                </h1>
                <p className="mt-6 text-base leading-7 text-greyDark">
                    We just sent an email to the address:{" "}
                    <span className="font-semibold">{emailAddress}</span>
                    <br />
                    Please check your email and select the link provided to
                    verify your address.
                </p>
                <div className="mt-6 w-full flex justify-center">
                    <Button
                        loading={sending}
                        onClick={handleSendVerifyEmail}
                        variant="default"
                        className="text-sm font-semibold"
                    >
                        Send Again
                    </Button>
                </div>
            </div>
        </PageContainer>
    );
};

export default SendEmailPage;
