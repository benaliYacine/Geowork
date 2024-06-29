import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import PageContainer from "@/components/common/PageContainer";
import detailedProfiles from "@/assets/illustrations/detailedProfiles.svg";
import diverse from "@/assets/illustrations/diverse.svg";
import geoRequest from "@/assets/illustrations/geoRequest.svg";
import { cn } from "@/lib/utils";

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const Feature = ({ img, title, description, reverse = false }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      variants={variants}
      className={cn(
        "flex items-center lg:w-full mb-10 sm:flex-row flex-col gap-0 sm:gap-0 md:gap-4 lg:gap-16 ",
        {
          "sm:flex-row-reverse": reverse,
        }
      )}
    >
      <div className="sm:flex-1 sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
        <img src={img} alt="img" />
      </div>
      <div className="sm:flex-1 sm:text-left text-center mt-6 sm:mt-0">
        <h2 className="text-black text-4xl sm:text-xl md:text-2xl lg:text-4xl font-semibold mb-2 md:mb-5">
          {title}
        </h2>
        <p className="leading-8 sm:text-md md:text-xl lg:text-2xl text-pretty">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section className="text-greyDark body-font  relative isolate">
      <PageContainer>
        <div className="container py-16">
          <div className="text-center mb-8 p-4">
            <motion.h2
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="sm:text-5xl text-4xl font-semibold text-black"
            >
              Key Features
            </motion.h2>
          </div>
          <Feature
            img={geoRequest}
            description="Ensure you're only matched with geoworkers who can easily reach you, making service delivery faster and more efficient."
            title="Geolocated Requests"
            reverse={true}
          />
          <Feature
            img={diverse}
            description="Access a wide variety of services all in one place. Whether you need household repairs, health consultations, or beauty services, find a geoworker for every need."
            title="Diverse Service Range"
          />
          <Feature
            img={detailedProfiles}
            description="Gain insights into the geoworkers you're considering. Profiles include qualifications, past work experience, customer reviews, and ratings to help you make an informed choice."
            title="Detailed Professional Profiles"
            reverse={true}
          />
        </div>
      </PageContainer>
      <div
        className="absolute inset-x-0 left-[-400px] -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-20"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr to-[#ff5400] from-[#ff6060] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[50rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default HeroSection;
