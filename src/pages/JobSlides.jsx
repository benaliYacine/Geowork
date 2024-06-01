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
import PropagateLoader from "react-spinners/PropagateLoader";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import JobPost from "@/components/jobPost/JobPost";

const JobSlides = () => {
    const [submiting, setSubmiting] = useState(false);
    const [isPhotoAdded, setIsPhotoAdded] = useState(false);
    const [showPhotoError, setShowPhotoError] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const submitFormRef = useRef(null);
    // New state for job information
    const [jobInfo, setJobInfo] = useState({
        title: "Residential Wiring Upgrade",
        category: "home_improvement_and_maintenance",
        subCategory: "electrician",
        wilaya: "algiers",
        city: "sidi_moussa",
        budget: "DZD  5, 500",
        description:
            "Upgraded the electrical wiring in a three-bedroom apartment in Algiers. Replaced old wiring with new, safe, and efficient wiring, installed new circuit breakers, and ensured all outlets and switches were up to code.",
        images: [],
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/jobSlides");
                console.log(response);
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                } else setLoading(false);
                if (response.data) {
                    setName(response.data.name.first);
                }
            } catch (error) {
                console.error(error);
                // Handle error here, if needed
            }
        };

        fetchData();
    }, []);

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
        setSubmiting(true);
        const formData = new FormData();
        console.log(jobInfo.images);
        // Ajouter les champs de texte
        formData.append("title", jobInfo.title);
        formData.append("category", jobInfo.category);
        formData.append("subCategory", jobInfo.subCategory);
        formData.append("wilaya", jobInfo.wilaya);
        formData.append("city", jobInfo.city);
        formData.append("budget", jobInfo.budget);
        formData.append("description", jobInfo.description);

        // Ajouter les images

        const files = [];
        for (let i = 0; i < jobInfo.images.length; i++) {
            const imageUrl = jobInfo.images[i];
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], `image_${i}.jpg`, {
                type: blob.type,
            });
            files.push(file);
        }

        files.forEach((file, index) => {
            formData.append(`images`, file, file.name);
        });

        try {
            const response = await axios.post("/api/jobs/createJob", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
                setSubmiting(false);
            }
        } catch (error) {
            console.error("Error submitting job info:", error);
        }
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
                <div className="h-full flex items-center justify-between">
                    <h1 className="text-black font-header text-4xl font-semibold my-2">
                        Job Details
                    </h1>
                    <Button
                        onClick={handleSubmit}
                        variant="default"
                        size="lg"
                        loading={submiting}
                    >
                        post the job
                    </Button>
                </div>
                <JobPost
                    jobInfo={jobInfo}
                    updateJobInfo={updateJobInfo}
                    edit={true}
                    title={true}
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
                        Post the job
                    </Button>
                </div>
            </div>
        </div>
    ) : (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex-1 flex flex-col justify-center">
                <PageContainer>
                    <div className="   h-full flex flex-col justify-center">
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
                        {!(currentSlide === 5) ? "Next" : "Review Job Post"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default JobSlides;
