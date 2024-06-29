import React from "react";
import geowork from "@/assets/geowork.svg";
import LoginForm from "../components/loginSignUp/LoginForm";
export default function Login() {
  return (
      <>
          <header className="flex justify-center items-center w-full pt-2 ">
              <nav
                  className="flex items-center justify-between m-3 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-18 w-full max-w-[1600px]"
                  aria-label="Global"
              >
                  <div className="flex">
                      <a href="/" className="-m-1.5 p-1.5">
                          <span className="sr-only">Geowork</span>
                          <img
                              className="h-8 w-auto"
                              src={geowork}
                              alt="geowork"
                          />
                      </a>
                  </div>
              </nav>
          </header>
          <div className="flex flex-col justify-center items-center min-h-screen bg-bg">
              <div className="w-full max-w-md px-3 py-8">
                  <LoginForm />
              </div>
          </div>
      </>
  );
}