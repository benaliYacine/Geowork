import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/common/PageContainer";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-white">
      <PageContainer>
        <div className="p-8 flex flex-col items-center justify-center gap-6">
          <motion.h2
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="sm:text-5xl text-3xl font-semibold text-black"
          >
            Are you ready?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl text-greyDark text-center"
          >
            Join our community and connect with local experts to solve your
            needs quickly and efficiently.
            <br />
            Sign up today and get started!
          </motion.p>
          <Link to="/signup" className="text-white">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="default" size="lg">
                Get Started
              </Button>
            </motion.div>
          </Link>
        </div>
      </PageContainer>
    </section>
  );
};

export default HeroSection;
