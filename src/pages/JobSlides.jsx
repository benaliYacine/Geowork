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
import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import EditBudgetButton from "@/components/jobPostEdit/EditBudgetButton";
import EditCategoryButton from "@/components/jobPostEdit/EditCategoryButton";
import EditDescriptionButton from "@/components/jobPostEdit/EditDescriptionButton";
import EditImageButton from "@/components/jobPostEdit/EditImageButton";
import EditLocationButton from "@/components/jobPostEdit/EditLocationButton";

import { MapPin } from "lucide-react";
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
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
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
    }
    if (currentSlide === -1) {
      setCurrentSlide(5);
    } else;
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
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1440px]">
        <div className="flex items-center justify-between">
          <h1 className="text-black font-header text-4xl font-bold">
            Job Details
          </h1>
          <Button onClick={handleSubmit} variant="default" size="lg">
            post the job
          </Button>
        </div>
        <div className="flex flex-col space-y-4 mt-6 ">
          <div className="relative">
            <h2 className="text-2xl font-bold">{jobInfo.title}</h2>
            <div className="absolute top-0 right-1 ">
              <EditTitleButton
                title={jobInfo.title}
                onEdit={(newTitle) => {
                  updateJobInfo({
                    title: newTitle,
                  });
                }}
              />
            </div>
          </div>
          <div className="relative">
            <p className="text-greyDark">
              <MapPin className="inline-block" /> {jobInfo.wilaya},{" "}
              {jobInfo.city}
            </p>
            <div className="absolute top-0 right-1 ">
              <EditLocationButton
                wilaya={jobInfo.wilaya}
                city={jobInfo.city}
                onEdit={(newWilaya, newCity) => {
                  updateJobInfo({
                    wilaya: newWilaya,
                  });
                  updateJobInfo({
                    city: newCity,
                  });
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div
              className="bg-cover bg-center rounded-3xl h-[450px] relative"
              style={{ backgroundImage: `url(${jobInfo.images[0]})` }}
            >
              <div className="absolute top-3 right-3 ">
                <EditImageButton
                  images={jobInfo.images}
                  onEdit={(newImages) => {
                    updateJobInfo({
                      images: newImages,
                    });
                  }}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <h3 className="font-bold">Description:</h3>
                <p className="line-clamp-14">{jobInfo.description}</p>
                <div className="absolute top-0 right-1 ">
                  <EditDescriptionButton
                    description={jobInfo.description}
                    onEdit={(newDescription) => {
                      updateJobInfo({
                        description: newDescription,
                      });
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4 gap-4">
                <div className="flex-1 relative">
                  <h4 className="font-bold">Category:</h4>
                  <p className="text-greyDark">
                    {jobInfo.category}, {jobInfo.subCategory}
                  </p>
                  <div className="absolute top-0 right-1 ">
                    <EditCategoryButton
                      category={jobInfo.category}
                      subCategory={jobInfo.subCategory}
                      onEdit={(newCategory, newSubCategory) => {
                        updateJobInfo({
                          category: newCategory,
                        });
                        updateJobInfo({
                          subCategory: newSubCategory,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex-1 relative">
                  <h4 className="font-bold">Budget:</h4>
                  <p className="text-greyDark">{jobInfo.budget}</p>
                  <div className="absolute top-0 right-1 ">
                    <EditBudgetButton
                      budget={jobInfo.budget}
                      onEdit={(newBudget) => {
                        updateJobInfo({
                          budget: newBudget,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full py-4">
        <div className="px-4 flex justify-between mt-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleSubmit} variant="default">
            Post the job
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
            {!(currentSlide === 5) ? "Next" : "review job post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobSlides;
