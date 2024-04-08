import React from "react";
import { Button } from "@/components/ui/button";
import mail_sent from "@/assets/illustrations/mail_sent.svg"; // Ensure correct path

const SendEmailPage = ({ emailAddress }) => {
  return (
    <>
      <main className="flex min-h-full items-center justify-center bg-bg px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
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
            Please check your email and select the link provided to verify your
            address.
          </p>
          <div className="mt-6">
            <Button variant="default" className="text-sm font-semibold">
              Send Again
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default SendEmailPage;
