import React from "react";
import { Button } from "@/components/ui/button";
import mail_sent from "@/assets/illustrations/mail_sent.svg"; // Ensure correct path
import AlertMessage from "@/components/common/AlertMessage";
import { useState } from "react";
const SendEmailPage = ({ emailAddress }) => {
  const [showAlert, setShowAlert] = useState(false);
  return (
    <>
      <main className="flex flex-col min-h-full w-full items-center justify-center bg-bg">
        <div className="m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1400px]">
          <AlertMessage
            showAlert={showAlert}
            message="New verification email is successfully sent. Please, check your email..."
            variant="success" // or "success" for success alerts
            onClose={() => setShowAlert(false)} // Assuming `setShowAlert` is your state setter
          />

          <div className="text-center py-20 sm:py-24">
            <img
              src={mail_sent}
              alt="Email Sent"
              className="mx-auto w-1/3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            />
            <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Verify your email to continue
            </h1>
            <p className="mt-6 text-base leading-7 text-greyDark">
              We just sent an email to the address:{" "}
              <span className="font-semibold">{emailAddress}</span>
              <br />
              Please check your email and select the link provided to verify
              your address.
            </p>
            <div className="mt-6">
              <Button
                variant="default"
                className="text-sm font-semibold"
                onClick={() => {setShowAlert(true)}}
              >
                Send Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default SendEmailPage;
