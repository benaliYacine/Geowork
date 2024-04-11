import React from "react";
import hero from "@/assets/illustrations/hero.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="text-black body-font flex justify-center items-center w-full h-[550px]">
      <div className="container flex flex-col lg:flex-row items-center justify-between mx-6 lg:mx-24 xl:mx-52 w-full max-w-[1440px]">
        <div className="flex-grow lg:w-1/2 xl:pr-24 lg:pr-16 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center lg:my-0 my-12" >
          <h1 className="font-header sm:text-5xl text-3xl font-bold mb-4 text-black">
            Connect Instantly With Local Experts Around You
          </h1>
          <div className="flex justify-center">
            <Link to="/signup" className="text-white">
              <Button variant="default" size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 xl:max-w-lg  w-5/6 hidden lg:block">
          <img
            className="object-cover object-center rounded"
            alt="hero"
            src={hero}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
