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
        roleTitle: "Residential Electrician", // Initialize with empty string or a default value
        category: "home_improvement_and_maintenance",
        subCategory: "electrician",
        employments: [
            {
                title: "Residential Electrician",
                company: "El Djazair Electric",
                Location: " Algiers, Algeria",
                currentlyIn: true,
                date: {
                    start: {
                        month: 9,
                        year: 2023,
                    },
                    end: {
                        month: 2,
                        year: 2021,
                    },
                },
                description:
                    " Installed and maintained electrical systems in residential buildings. Ensured compliance with safety standards and local codes.",
            },
            {
                title: "Commercial Electrician",
                company: "Sahara Power Solutions",
                Location: "Oran, Algeria",
                currentlyIn: true,
                date: {
                    start: {
                        month: 5,
                        year: 2017,
                    },
                    end: {
                        month: 1,
                        year: 2022,
                    },
                },
                description:
                    "Handled electrical wiring and systems for commercial properties. Performed regular maintenance and troubleshooting.",
            },
            {
                title: " Industrial Electrician",
                company: "Sonatrach Energy",
                Location: "Hassi Messaoud, Algeria",
                currentlyIn: true,
                date: {
                    start: {
                        month: 5,
                        year: 2007,
                    },
                    end: {
                        month: 1,
                        year: 2015,
                    },
                },
                description:
                    " Maintained and repaired electrical equipment in an industrial setting. Worked on high-voltage systems and ensured operational efficiency.",
            },
        ],
        experiences: [
            {
                title: "Residential Installations",
                description:
                    " Installed wiring and electrical systems for new homes. Worked independently and collaborated with local builders.",
            },
            {
                title: "Commercial Lighting Upgrades",
                description:
                    "Upgraded lighting systems for small businesses. Improved energy efficiency and reduced operational costs.",
            },
            {
                title: "Home Electrical Repairs",
                description:
                    "Performed electrical repairs for friends and neighbors. Fixed wiring issues, replaced outlets, and installed new fixtures.",
            },
        ],
        educations: [
            {
                school: "University of Science and Technology Houari Boumediene (USTHB)",
                degree: " Bachelor's Degree",
                fieldOfStudy: " Electrical Engineering",
                datesAttended: {
                    start: 2010,
                    end: 2014,
                },
                description:
                    "Completed comprehensive coursework in electrical systems, circuits, and power distribution. Participated in hands-on lab projects.",
            },
            {
                school: "Algerian Vocational Training Center",
                degree: "Certification",
                fieldOfStudy: "Residential Electrical Systems",
                datesAttended: {
                    start: 2015,
                    end: 2016,
                },
                description:
                    "Specialized in residential electrical wiring and safety practices. Certified to work as a residential electrician.",
            },
            {
                school: "National Institute of Renewable Energy (INE)",
                degree: "Certification",
                fieldOfStudy: "Solar Energy Systems",
                datesAttended: {
                    start: 2017,
                    end: 2018,
                },
                description:
                    "Studied the design and installation of solar power systems. Emphasized sustainable energy solutions and practical applications.",
            },
        ],
        jobs: [],
        Bio: "I am an experienced electrician with over a decade of expertise in residential, commercial, and industrial electrical systems. With a Bachelor's Degree in Electrical Engineering from USTHB and certifications in various specialized fields, I have a strong foundation in both theoretical knowledge and practical skills. I have worked on a wide range of projects, from installing solar panels in rural communities to upgrading commercial lighting systems. My passion for sustainable energy solutions and commitment to electrical safety have driven my career. Whether it's troubleshooting complex issues or providing emergency services, I am dedicated to delivering reliable and efficient electrical solutions to my clients in Algeria.",
        // dateBirthday:"Thu Mar 07 2024 00:00:00 GMT+0100 (Central European Standard Time)",
        dateBirthday: undefined,
        streetAdress: "123 Rue Didouche Mourad, Algiers, Algeria",
        phone: "05 62 17 02 86",
        photoProfile: undefined,
    });
    // const [profileInfo, setProfileInfo] = useState({
    //     employments: [],
    //     experiences: [],
    //     educations: [],
    //     jobs: [],
    // });
    const [expert, setExpert] = useState(null);
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
                }
                if (response.data) {
                    setExpert({
                        name: `${response.data.name.first} ${response.data.name.last}`,
                        wilaya: response.data.wilaya,
                        city: response.data.city,
                    });
                    setLoading(false);
                }
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
            formData.append(
                `employments[${index}][date][start][month]`,
                startMonth
            );
            formData.append(
                `employments[${index}][date][start][year]`,
                startYear
            );

            // Convert date end
            const endDate = new Date(
                employment.date.end.year,
                employment.date.end.month - 1
            );
            const endMonth = endDate.getMonth() + 1;
            const endYear = endDate.getFullYear();
            formData.append(
                `employments[${index}][date][end][month]`,
                endMonth
            );
            formData.append(`employments[${index}][date][end][year]`, endYear);

            // Append other fields
            Object.keys(employment).forEach((key) => {
                if (key !== "date") {
                    formData.append(
                        `employments[${index}][${key}]`,
                        employment[key]
                    );
                }
            });
        });

        experiences.forEach((experience, index) => {
            Object.keys(experience).forEach((key) => {
                formData.append(
                    `experiences[${index}][${key}]`,
                    experience[key]
                );
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
        setSubmiting(false);
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
    // const expert = {
    //   name: `John Doe`,
    //   //role: "Web Developer",
    //   //rating: Math.random() * 5,
    //   //avatarUrl: "https://github.com/johndoe.png",
    //   wilaya: "algiers",
    //   city: "algiers",
    // };
    // Render the current slide based on `currentSlide`
    const renderSlide = () => {
        const commonProps = {
            submitFormRef,
            inc,
            profileInfo,
            updateProfileInfo,
        };
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
                    preview
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
                    <Button
                        onClick={handleSubmit}
                        variant="default"
                        loading={submiting}
                    >
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
