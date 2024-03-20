import React from "react";
import SignUpForm from "../SignUpForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-3 py-8">
        <SignUpForm />
      </div>
    </div>
  );
}
