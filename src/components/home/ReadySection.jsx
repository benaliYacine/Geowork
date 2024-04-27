import React from "react";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/PageContainer";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <section className=" bg-white">
      <PageContainer>
        <div className="p-8 flex flex-col items-center justify-center gap-6">
          <h2 className="sm:text-5xl text-3xl font-semibold text-black">
            Are you ready?
          </h2>
          <Link to="/signup" className="text-white">
            <Button variant="default" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
};

export default HeroSection;
