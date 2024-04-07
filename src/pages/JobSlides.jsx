import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Placeholder for your slide components
import SlideOne from "@/components/job_slides/SlideOne";
import SlideTwo from "@/components/job_slides/SlideTwo";
import SlideThree from "@/components/job_slides/SlideThree";
import SlideFour from "@/components/job_slides/SlideFour";
import SlideFive from "@/components/job_slides/SlideFive";
import SlideSix from "@/components/job_slides/slideSix/SlideSix";
// import SlideTwo from './SlideTwo';
// ... import other slides

const JobSlides = () => {
  const [isPhotoAdded, setIsPhotoAdded] = useState(false);
  const [showPhotoError, setShowPhotoError] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const submitFormRef = useRef(null);
  // New state for job information
  const [jobInfo, setJobInfo] = useState({
    title: "na7ihom memba3d ",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "alger",
    city: "",
    budget: "DZD  55",
    description:
      " Lorem ipsum dolor e possimus, neque itaque, nisi nihil saepe, dicta unde.",
    images: [],
  });

  // const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('/profileSlides');
  //       console.log(response);
  //       if (response.data.redirectUrl) {
  //         navigate(response.data.redirectUrl);
  //       } else
  //         setLoading(false);
  //       if (response.data) {
  //         setName(response.data.name.first);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       // Handle error here, if needed
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Function to update job information
  const updateJobInfo = (newInfo) => {
    setJobInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  const totalSlides = 6;
  const progress = Math.round((currentSlide / (totalSlides - 1)) * 100);

  const handleNext = () => {
    if (!isPhotoAdded && currentSlide === 5) {
      // Assuming slide 7 (index 6) is where the photo is required
      setShowPhotoError(true); // Show error message
      return; // Prevent proceeding to the next step
    }
    if (submitFormRef.current) {
      submitFormRef.current(); // This will trigger form submission/validation
    } else {
      inc();
    }
    // Additional logic to handle form submission on the last slide
  };
  const handleSubmit = async () => {
    // const dataUrl = profileInfo.photoProfile;
    // const blobData = await fetch(dataUrl).then((res) => res.blob());
    // delete profileInfo.photoProfile;
    // delete profileInfo.photoProfileSrc;
    // const formData = new FormData();
    // profileInfo.employments = JSON.stringify(profileInfo.employments);
    // profileInfo.experiences = JSON.stringify(profileInfo.experiences);
    // profileInfo.educations = JSON.stringify(profileInfo.educations);
    // let employments = JSON.parse(profileInfo.employments);
    // let experiences = JSON.parse(profileInfo.experiences);
    // let educations = JSON.parse(profileInfo.educations);
    // formData.append('roleTitle', profileInfo.roleTitle);
    // formData.append('category', profileInfo.category);
    // formData.append('subCategory', profileInfo.subCategory);
    // formData.append('Bio', profileInfo.Bio);
    // formData.append('dateBirthday', profileInfo.dateBirthday);
    // formData.append('streetAdress', profileInfo.streetAdress);
    // formData.append('phone', profileInfo.phone);
    // employments.forEach((employment, index) => {
    //   Object.keys(employment).forEach((key) => {
    //     formData.append(`employments[${index}][${key}]`, employment[key]);
    //   });
    // });
    // experiences.forEach((experience, index) => {
    //   Object.keys(experience).forEach((key) => {
    //     formData.append(`experiences[${index}][${key}]`, experience[key]);
    //   });
    // });
    // educations.forEach((education, index) => {
    //   Object.keys(education).forEach((key) => {
    //     formData.append(`educations[${index}][${key}]`, education[key]);
    //   });
    // });
    // formData.append('image', blobData);
    // const response = await axios.patch("/api/professionnels/addProfileProfessionnel", formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // console.log(response);
  };

  const inc = () => {
    if (currentSlide < totalSlides - 1 && currentSlide != -1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (currentSlide === totalSlides - 1) {
      setCurrentSlide(-1);
    }
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else setCurrentSlide(5);
  };

  // Render the current slide based on `currentSlide`
  const renderSlide = () => {
    const commonProps = { submitFormRef, inc, jobInfo, updateJobInfo };
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
        return (
          <SlideSix
            {...commonProps}
            setShowPhotoError={setShowPhotoError}
            setIsPhotoAdded={setIsPhotoAdded}
            showPhotoError={showPhotoError}
          />
        );
      default:
        return <div>Slide not implemented</div>;
    }
  };
  // if (loading) return (<div></div>);
  return currentSlide === -1 ? (
    <div className=" flex h-screen flex-col">
      <div className="flex flex-grow flex-col mx-6 md:mx-20 lg:mx-40 justify-start">
        {/* here is gona be the page content */}
        {/*  hna yji el preview w dir l buton ghi kima li fat ydiir w handle next ani msegemha yeb9a anou ilyes ydiir el ta3ou f handleSubmit*/}
      </div>
      <div className="w-full py-4">
        <div className="px-4 flex justify-between mt-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleSubmit} variant="default">
            post the job
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className=" flex h-screen flex-col">
      <div className="flex flex-grow flex-col mx-6 md:mx-20 lg:mx-40 justify-center">
        {renderSlide()}
      </div>
      <div className="w-full py-4">
        <Progress value={progress} className="mb-4" />
        <div className="px-4 flex justify-between mt-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleNext} variant="default">
            {!(currentSlide === 5) ? "Next" : "review job post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSlides;
