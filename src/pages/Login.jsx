import React from "react";
import LoginForm from "../components/loginSignUp/LoginForm";
export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-bg">
      <div className="w-full max-w-md px-3 py-8">
        <LoginForm />
        
      </div>
    </div>
  );
}
