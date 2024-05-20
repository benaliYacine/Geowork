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
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Profile from "@/components/profile/Profile";

// import SlideTwo from './SlideTwo';
// ... import other slides
import PropagateLoader from "react-spinners/PropagateLoader";
const ProfileSlides = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [submiting, setSubmiting] = useState(false);
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
      },
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
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
          " Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde. Lorem ipsum dolor sit ametmagnam porro voluptatem fugit molestiae perferendis, dicta unde.",
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
    jobs: [
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        canceled: true,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 2.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
      {
        title: "na7ihom memba3d ",
        startDate:
          "Wed Oct 19 2022 07:07:43 GMT+0100 (Central European Standard Time)",
        endDate:
          "Tue Apr 09 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        category: "education_and_tutoring",
        subCategory: "math_tutor",
        wilaya: "algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
        images: ["https://placebear.com/g/200/200"],
        rate: 4.5,
        feedback:
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
      },
    ],
    Bio: "na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde. na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde. na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde. na7i memba3d Lorem m tempore possimus, neque itaque, nisi nihil saepe, dicta unde.",
    // dateBirthday:"Thu Mar 07 2024 00:00:00 GMT+0100 (Central European Standard Time)",
    dateBirthday: undefined,
    streetAdress: " tiaret tiaret asdf asd f",
    phone: "05 55 55 55 55",
    photoProfile: undefined,
  });
  const [photoProfileSrc, setPhotoProfileSrc] = useState(undefined);
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
    setSubmiting(true);
    const dataUrl = profileInfo.photoProfile;
    const blobData = await fetch(dataUrl).then((res) => res.blob());
    delete profileInfo.photoProfile;
    // delete profileInfo.photoProfileSrc;
    const formData = new FormData();
    profileInfo.employments = JSON.stringify(profileInfo.employments);
    profileInfo.experiences = JSON.stringify(profileInfo.experiences);
    profileInfo.educations = JSON.stringify(profileInfo.educations);
    let employments = JSON.parse(profileInfo.employments);
    let experiences = JSON.parse(profileInfo.experiences);
    let educations = JSON.parse(profileInfo.educations);
    console.log("profileInfo", profileInfo.employments);
    formData.append("roleTitle", profileInfo.roleTitle);
    formData.append("category", profileInfo.category);
    formData.append("subCategory", profileInfo.subCategory);
    formData.append("Bio", profileInfo.Bio);
    formData.append("dateBirthday", profileInfo.dateBirthday);
    formData.append("streetAdress", profileInfo.streetAdress);
    formData.append("phone", profileInfo.phone);

    employments.forEach((employment, index) => {
      // Convert date start
      const startDate = new Date(
        employment.date.start.year,
        employment.date.start.month - 1
      );
      const startMonth = startDate.getMonth() + 1;
      const startYear = startDate.getFullYear();
      formData.append(`employments[${index}][date][start][month]`, startMonth);
      formData.append(`employments[${index}][date][start][year]`, startYear);

      // Convert date end
      const endDate = new Date(
        employment.date.end.year,
        employment.date.end.month - 1
      );
      const endMonth = endDate.getMonth() + 1;
      const endYear = endDate.getFullYear();
      formData.append(`employments[${index}][date][end][month]`, endMonth);
      formData.append(`employments[${index}][date][end][year]`, endYear);

      // Append other fields
      Object.keys(employment).forEach((key) => {
        if (key !== "date") {
          formData.append(`employments[${index}][${key}]`, employment[key]);
        }
      });
    });

    experiences.forEach((experience, index) => {
      Object.keys(experience).forEach((key) => {
        formData.append(`experiences[${index}][${key}]`, experience[key]);
      });
    });

    educations.forEach((education, index) => {
      // Append school, degree, fieldOfStudy, and description
      formData.append(`educations[${index}][school]`, education.school);
      formData.append(`educations[${index}][degree]`, education.degree);
      formData.append(
        `educations[${index}][fieldOfStudy]`,
        education.fieldOfStudy
      );
      formData.append(
        `educations[${index}][description]`,
        education.description
      );

      // Convert datesAttended to numbers and append
      formData.append(
        `educations[${index}][datesAttended][start]`,
        Number(education.datesAttended.start)
      );
      formData.append(
        `educations[${index}][datesAttended][end]`,
        Number(education.datesAttended.end)
      );
    });
    console.log("blobData", blobData);
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
    setSubmiting(true);
    navigate("/dashboard");
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
      setCurrentSlide(6);
    } else;
  };
  const expert = {
    name: `John Doe`,
    role: "Web Developer",
    rating: Math.random() * 5,
    avatarUrl: "https://github.com/johndoe.png",
    wilaya: "algiers",
    city: "Central",
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
            photoProfileSrc={photoProfileSrc}
            setPhotoProfileSrc={setPhotoProfileSrc}
            setShowPhotoError={setShowPhotoError}
            setIsPhotoAdded={setIsPhotoAdded}
            showPhotoError={showPhotoError}
          />
        );
      default:
        return <div>Slide not implemented</div>;
    }
  };
  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
        <PropagateLoader color="#FF5400" />
      </div>
    );
  return currentSlide === -1 ? (
    <div>
      <Header />
      <PageContainer>
        <div className="flex items-center justify-between mb-4 mt-2">
          <h1 className="text-black font-header text-4xl font-semibold ">
            Profile Preview
          </h1>
          <Button
            onClick={handleSubmit}
            variant="default"
            size="lg"
            loading={submiting}
          >
            Submit profile
          </Button>
        </div>
        <Profile
          expert={expert}
          profileInfo={profileInfo}
          photoProfileSrc={photoProfileSrc}
          updateProfileInfo={updateProfileInfo}
          edit={true}
        />
      </PageContainer>
      <div className="w-full py-4">
        <div className="px-4 flex justify-between mt-4">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleSubmit} variant="default" loading={submiting}>
            Submit profile
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className=" flex h-screen flex-col">
      <Header />
      <div className="flex-1 flex flex-col justify-center">
        <PageContainer>
          <div className="h-full flex flex-col justify-center">
            {renderSlide()}
          </div>
        </PageContainer>
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
            {!(currentSlide === 6) ? "Next" : "Review Profile"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlides;
