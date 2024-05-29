import React from "react";
import { Button } from "@/components/ui/button";
import mail_sent from "@/assets/illustrations/mail_sent.svg"; // Ensure correct path
import AlertMessage from "@/components/common/AlertMessage";
import { useState, useEffect } from "react";
import axios from "axios";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate, useParams } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import { Link } from "react-router-dom";

const EmailVerified = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const { type, id, tokenId } = useParams();
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `/${type}/${id}/verify/${tokenId}`
            );
            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
            if (response.data.message == "Invalid link") setIsValid(false);
            console.log(response.data);
            setLoading(false);
        };
        fetchData(false);
    }, []);

    const handleSendVerifyEmail = async () => {
        const response = await axios.post("/verifyEmail");
        console.log(response);
        if (response.data.redirectUrl) {
            navigate(response.data.redirectUrl);
        }
        if (!response.data.error) {
            setShowAlert(true);
        }
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
                {isValid ? (
                    <>
                        <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Your email was verified successfully
                        </h1>
                        <p className="mt-6 text-base leading-7 text-greyDark">
                            {/* Your email was verified successfully <br /> */}
                            {/* Please check your email and select the link provided to
                    verify your address. */}
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                            Your email was not verified
                        </h1>
                        <p className="mt-6 text-base leading-7 text-greyDark">
                            Invalid email
                            {/* <br /> */}
                            {/* Please check your email and select the link provided to
                    verify your address. */}
                        </p>
                    </>
                )}
                {isValid ? (
                    <Link to="/" className="rounded-md shadow-sm">
                        <Button variant="default">Go back home</Button>
                    </Link>
                ) : (
                    <Button
                        onClick={handleSendVerifyEmail}
                        variant="default"
                        className="text-sm font-semibold"
                    >
                        Send Again
                    </Button>
                )}
                <div className="mt-6 w-full flex justify-center"></div>
            </div>
        </PageContainer>
    );
};

export default EmailVerified;
