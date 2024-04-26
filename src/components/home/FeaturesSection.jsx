import React from "react";
import hero from "@/assets/illustrations/hero.svg";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import post from "@/assets/illustrations/post.svg";
import discover from "@/assets/illustrations/discover.svg";
import done from "@/assets/illustrations/done.svg";
import PageContainer from "@/components/common/PageContainer";
import detailedProfiles from "@/assets/illustrations/detailedProfiles.svg";
import diverse from "@/assets/illustrations/diverse.svg";
import geoRequest from "@/assets/illustrations/geoRequest.svg";
import {cn} from "@/lib/utils"
const Feature = ({ img, title, description, reverse = false }) => {
  return (
    <div
      className={cn(
        "flex items-center lg:w-full  mb-10 sm:flex-row flex-col gap-0 sm:gap-0 md:gap-4 lg:gap-16 ",
        {
          "sm:flex-row-reverse": reverse,
        }
      )}
    >
      <div className="sm:flex-1  sm:mr-10 inline-flex items-center justify-center flex-shrink-0">
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
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="text-greyDark body-font ">
      <PageContainer>
        <div className="container py-16">
          <div className="text-center mb-8 p-4">
            <h2 className="sm:text-5xl text-4xl font-semibold text-black">
              Key Features
            </h2>
          </div>
          <Feature
            img={geoRequest}
            description="Ensure you're only matched with professionals who can easily reach you, making service delivery faster and more efficient."
            title="Geolocated Requests"
          />
          <Feature
            img={diverse}
            description="Access a wide variety of services all in one place. Whether you need household repairs, health consultations, or beauty services, find a professional for every need."
            title="Diverse Service Range"
            reverse={true}
          />
          <Feature
            img={detailedProfiles}
            description="Gain insights into the professionals you're considering. Profiles include qualifications, past work experience, customer reviews, and ratings to help you make an informed choice."
            title="Detailed Professional Profiles"
          />
        </div>
      </PageContainer>
    </section>
  );
};

export default HeroSection;
