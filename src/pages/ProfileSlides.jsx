import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// Placeholder for your slide components
import SlideOne from "@/components/profile_slides/SlideOne";
import SlideTwo from "@/components/profile_slides/SlideTwo";
import SlideThree from "@/components/profile_slides/slideThree/SlideThree";
import SlideFour from "@/components/profile_slides/slideFour/SlideFour";
import SlideFive from "@/components/profile_slides/slideFive/SlideFive";
import SlideSix from "@/components/profile_slides/SlideSix";
import SlideSeven from "@/components/profile_slides/slideSeven/SlideSeven";
// import SlideTwo from './SlideTwo';
// ... import other slides

const ProfileSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const submitFormRef = useRef(null);
  // New state for profile information
  const [profileInfo, setProfileInfo] = useState({
    roleTitle: "na7ihom memba3d ", // Initialize with empty string or a default value
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    employments: [
      {
        title: "memba3d na7iha",
        company: "test",
        Location: "test",
        currentlyIn: true,
        date: {
          start: {
            month: 2,
            year: 2020,
          },
          end: {
            month: 2,
            year: 2021,
          },
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        title: "memba3d na7iha",
        company: "test",
        Location: "test",
        currentlyIn: false,
        date: {
          start: {
            month: 1,
            year: 2020,
          },
          end: {
            month: 1,
            year: 2021,
          },
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
    ],
    experiences: [
      {
        title: "memba3d na7iha",
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        title: "memba3d na7iha",
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        title: "memba3d na7iha",
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
    ],
    educations: [
      {
        school: "memba3d na7iha",
        degree: "test",
        fieldOfStudy: "test",
        datesAttended: {
          start: 2021,
          end: 2025,
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        school: "memba3d na7iha",
        degree: "test",
        fieldOfStudy: "test",
        datesAttended: {
          start: 2021,
          end: 2025,
        },
        description:
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
      {
        school: "memba3d na7iha",
        degree: "test",
        fieldOfStudy: "test",
        datesAttended: {
          start: 2021,
          end: 2025,
        },
        description:
          " Lorem ipsum dolor e possimus, neque itaque, nisi nihil saepe, dicta unde.",
      },
    ],
    Bio: "na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde.",
    // dateBirthday:"Thu Mar 07 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    dateBirthday: "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    streetAdress: " tiaret tiaret asdf asd f",
    phone: "05 55 55 55 55",
    photoProfile: undefined,
    photoProfileSrc: undefined,
  });

  const [isPhotoAdded, setIsPhotoAdded] = useState(false);
  const [showPhotoError, setShowPhotoError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/profileSlides");
        console.log(response);
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else setLoading(false);
      } catch (error) {
        console.error(error);
        // Handle error here, if needed
      }
    };

    fetchData();
  }, []);

  // Function to update profile information
  const updateProfileInfo = (newInfo) => {
    setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  const totalSlides = 7;
  const progress = Math.round((currentSlide / (totalSlides - 1)) * 100);

  const handleNext = () => {
    if (!isPhotoAdded && currentSlide === 6) {
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
    const dataUrl = profileInfo.photoProfile;
    const blobData = await fetch(dataUrl).then((res) => res.blob());
    delete profileInfo.photoProfile;
    delete profileInfo.photoProfileSrc;
    const formData = new FormData();
    profileInfo.employments = JSON.stringify(profileInfo.employments);
    profileInfo.experiences = JSON.stringify(profileInfo.experiences);
    profileInfo.educations = JSON.stringify(profileInfo.educations);
    let employments = JSON.parse(profileInfo.employments);
    let experiences = JSON.parse(profileInfo.experiences);
    let educations = JSON.parse(profileInfo.educations);

    formData.append("roleTitle", profileInfo.roleTitle);
    formData.append("category", profileInfo.category);
    formData.append("subCategory", profileInfo.subCategory);
    formData.append("Bio", profileInfo.Bio);
    formData.append("dateBirthday", profileInfo.dateBirthday);
    formData.append("streetAdress", profileInfo.streetAdress);
    formData.append("phone", profileInfo.phone);

    employments.forEach((employment, index) => {
      Object.keys(employment).forEach((key) => {
        formData.append(`employments[${index}][${key}]`, employment[key]);
      });
    });

    experiences.forEach((experience, index) => {
      Object.keys(experience).forEach((key) => {
        formData.append(`experiences[${index}][${key}]`, experience[key]);
      });
    });

    educations.forEach((education, index) => {
      Object.keys(education).forEach((key) => {
        formData.append(`educations[${index}][${key}]`, education[key]);
      });
    });
    console.log("blobData",blobData);
    formData.append("image", blobData);

    const response = await axios.patch(
      "/api/professionnels/addProfileProfessionnel",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response);
  };

  const inc = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
    if (currentSlide === totalSlides - 1) {
      handleSubmit();
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
        return (
          <SlideSeven
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
  if (loading) return <div></div>;
  return (
    <div className=" flex h-screen flex-col">
      <div className="flex flex-grow flex-col mx-6 md:mx-20 lg:mx-40 justify-center">
        {renderSlide()}
      </div>
      <div className="w-full py-4">
        <Progress value={progress} className="mb-4" />
        <div className="px-4 flex justify-between mt-4">
          {currentSlide != 0 ? (
            <Button onClick={handleBack} variant="outline">
              Back
            </Button>
          ) : (
            <Button
              onClick={handleBack}
              variant="outline"
              className="opacity-0"
            >
              Back
            </Button>
          )}
          <Button onClick={handleNext} variant="default">
            {!(currentSlide === 6) ? "Next" : "Submit profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlides;
