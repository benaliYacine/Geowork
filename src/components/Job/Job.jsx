import { Button } from "@/components/ui/button";
import axios from "axios";
import { React, useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import JobPost from "@/components/jobPost/JobPost";
import { Heart } from "lucide-react";
import AboutClient from "@/components/Job/AboutClient";
import JobActivity from "@/components/Job/JobActivity";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "@/components/common/AlertMessage";
import ClientHistory from "@/components/Job/ClientHistory";
function Job({ jobInfo, apply = false }) {
    console.log("heart", jobInfo.heart);
    console.log("jobInfo", jobInfo);
    const navigate = useNavigate();
    let clientHistory = jobInfo.client.jobs
        .filter((j) => j.closed) // Filter out non-closed jobs
        .map((j) => ({
            title: j.title || "N/A", // Provide default values if necessary
            ExpertRating: j.professionnelRating || "No Rating",
            category: j.category || "No Category",
            subCategory: j.subCategory || "No SubCategory",
            budget: j.budget || "No Budget", // Corrected typo
            feedback: j.professionnelFeedback || "No Feedback",
        }));
    console.log("avant", clientHistory);

    /*      clientHistory = [
        {
            title: "Home Electrical System Upgrade",
            ExpertRating: 3.5,
            category: "home_improvement_and_maintenance",
            subCategory: "electrician",
            startDate: "Jan 2024",
            endDate: "Aug 2024",
            budget: "DZD 50000",
            feedback: "excellent client, I recommend working with him",
        },
        {
            title: "test test",
            ExpertRating: 5,
            category: "test",
            subCategory: "test",
            startDate: "Aug 2023",
            endDate: "Jan 2024",
            budget: "DZD 5000",
            feedback: "lorem",
        },
    ]; */
    const [showAlert, setShowAlert] = useState(true);
    const [notAvailable, setNotAvailable] = useState(jobInfo.closed||jobInfo.hired);

    const [isSaved, setIsSaved] = useState(false);
    const [client, setClient] = useState({
        jobsNumber: "73",
        totalSpent: "DZD 1.4K",
        joinDate: "Jan 25, 2010",
    });
    console.log(jobInfo);
    const [activity, setActivity] = useState({
        proposalsNumber: jobInfo.proposals ? jobInfo.proposals.length : 0,
        lastViewed:
            "Sun Apr 28 2024 07:48:56 GMT+0100 (Central European Standard Time)", // hadi dirha bel date fct ta3 js 3adi
        interviewingNumber: "1",
        invitesNumber: jobInfo.hires ? jobInfo.hires.length : 0,
        hiredNumber: "0",
    });
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.post("/clientinfo", {
                id: jobInfo.id,
            });
            console.log("client info", response.data);
            if (response.data) {
                setClient({
                    jobsNumber: response.data.jobs.length,
                    wilaya: response.data.wilaya,
                    city: response.data.city,
                    rating: response.data.rating,
                });
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        setIsSaved(jobInfo.heart);
    }, [jobInfo.heart]);
    const heartClick = async () => {
        let response;
        console.log(jobInfo);
        console.log(isSaved);
        setIsSaved(!isSaved);
        if (!isSaved) {
            response = await axios.patch("/api/jobs/addSavedJob", {
                id: jobInfo.id,
            });
            console.log(response.data);
        } else {
            response = await axios.patch("/api/jobs/suppSavedJob", {
                id: jobInfo.id,
            });
            console.log(response.data);
        }
    };

    return (
        <div className="flex flex-col gap-4 mb-4">
            <AlertMessage
                showAlert={showAlert && notAvailable}
                variant="destructive"
                onClose={() => setShowAlert(false)}
                message="This job is no longer available."
            />
            <div className="flex space-x-4">
                <div className="space-y-4">
                    <JobPost
                        jobInfo={jobInfo}
                        edit={false}
                        title={true}
                        notAvailable={notAvailable}
                    />
                    <Separator />
                    <JobActivity activity={activity} />
                </div>

                <Separator orientation="vertical" className="h-[800px] w-1" />
                <div className="flex-none flex flex-col gap-16 mt-8">
                    {apply ? (
                        <div className="flex flex-col gap-3">
                            {/* TODO: khdem el apply */}
                            <Button
                                disabled={notAvailable}
                                onClick={() => {
                                    navigate(`/submitProposal/${jobInfo.id}`);
                                }}
                            >
                                Apply Now
                            </Button>
                            {/* TODO: khdem el save */}
                            <Button onClick={heartClick} variant="outline">
                                <Heart
                                    className={
                                        isSaved ? "fill-primary mr-2" : "mr-2"
                                    }
                                />
                                Save job
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => {
                                    navigate("/jobSlides");
                                }}
                            >
                                Post a job like this
                            </Button>
                        </div>
                    )}

                    <AboutClient client={client} />
                </div>
            </div>
            <ClientHistory clientHistory={clientHistory} />
        </div>
    );
}

export default Job;
