import React from "react";
import WilayaCityForm from "../components/loginSignUp/WilayaCityForm";

export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-bg">
      <div className="w-full max-w-md px-3 py-8">
        <WilayaCityForm />
      </div>
    </div>
  );
}
