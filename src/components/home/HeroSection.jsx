import React from "react";
import { motion } from "framer-motion";
import hero from "@/assets/illustrations/hero.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/PageContainer";

const HeroSection = () => {
  return (
    <PageContainer>
      <section className="text-black body-font flex justify-center items-center w-full h-[550px] relative isolate">
        

        <div className="container flex flex-col lg:flex-row items-center justify-between w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-grow lg:w-1/2 xl:pr-24 lg:pr-16 flex flex-col lg:items-start lg:text-left mb-16 lg:mb-0 items-center text-center lg:my-0 my-12"
          >
            <h1 className="font-header sm:text-6xl text-3xl font-bold mb-4 text-black">
              Connect Instantly With Local Experts Around You
            </h1>
            <div className="flex justify-center">
              <Link to="/signup" className="text-white">
                <Button variant="default" size="lg">
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 xl:max-w-lg w-5/6 hidden lg:block"
          >
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={hero}
            />
          </motion.div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr to-[#ff5400] from-[#ff6060] opacity-30 sm:left-[calc(50%+40rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          ></div>
        </div>
      </section>

      {/* <div className=" opacity-25 absolute bg-bg bottom-[-8px] left-[-100px] rounded-full border-2 border-t-2 border-primary w-40 h-40"></div>
      <div className="opacity-50 absolute bg-bg bottom-[-32px] left-[-100px] rounded-full border-2 border-primary w-40 h-40"></div>
      <div className="opacity-75 absolute bg-bg bottom-[-56px] left-[-100px] rounded-full border-2 border-primary w-40 h-40"></div>
      <div className="opacity-100 absolute bg-bg bottom-[-80px] left-[-100px] rounded-full border-2 border-primary w-40 h-40"></div> */}
    </PageContainer>
  );
};

export default HeroSection;
