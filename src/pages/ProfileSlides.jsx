import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import React, { useState, useRef } from "react";

// Placeholder for your slide components
import SlideOne from "../components/SlideOne";
import SlideTwo from "../components/SlideTwo";
import SlideThree from "../components/SlideThree";
import SlideFour from "../components/SlideFour";
import SlideFive from "../components/SlideFive";
import SlideSix from "../components/SlideSix";
import SlideSeven from "../components/SlideSeven";
// import SlideTwo from './SlideTwo';
// ... import other slides

const ProfileSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const submitFormRef = useRef(null);
  // New state for profile information
  const [profileInfo, setProfileInfo] = useState({
    roleTitle: "", // Initialize with empty string or a default value
    category: "",
    subCategory: "",
  });

  // Function to update profile information
  const updateProfileInfo = (newInfo) => {
    setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  const totalSlides = 7;
  const progress = Math.round((currentSlide / (totalSlides - 1)) * 100);

  const handleNext = () => {
    if (submitFormRef.current) {
      submitFormRef.current(); // This will trigger form submission/validation
    } else {
      // For slides without form submission logic, just move to the next slide
      if (currentSlide < totalSlides - 1) {
        setCurrentSlide(currentSlide + 1);
      }
    }
    // Additional logic to handle form submission on the last slide
  };

  const inc = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Render the current slide based on `currentSlide`
  const renderSlide = () => {
    const commonProps = { submitFormRef, inc, profileInfo, updateProfileInfo };
    switch (currentSlide) {
      case 0:
        return <SlideOne {...commonProps} />;
      case 1:
        return <SlideTwo {...commonProps} />;
      case 2:
        return <SlideThree {...commonProps} />;
      case 3:
        return <SlideFour {...commonProps} />;
      case 4:
        return <SlideFive {...commonProps} />;
      case 5:
        return <SlideSix {...commonProps} />;
      case 6:
        return <SlideSeven {...commonProps} />;
      default:
        return <div>Slide not implemented</div>;
    }
  };

  return (
    <div className=" flex h-screen flex-col">
      <div className="flex flex-grow flex-col mx-6 md:mx-20 lg:mx-40 justify-center">
        {renderSlide()}
      </div>
      <div className="w-full py-4">
        <Progress value={progress} className="mb-4" />
        <div className="px-4 flex justify-between mt-4">
          <Button onClick={handleBack} variant="white">
            Back
          </Button>
          <Button onClick={handleNext} variant="default">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlides;
