import { Button } from "@/components/ui/button";
import axios from 'axios';
import { React, useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import JobPost from "@/components/jobPost/JobPost";
import { Heart } from "lucide-react";
import AboutClient from "@/components/Job/AboutClient";
import JobActivity from "@/components/Job/JobActivity";
import { useNavigate, useParams } from "react-router-dom";
import AlertMessage from "@/components/common/AlertMessage";

function Job({ jobInfo, apply = false }) {
  console.log("heart",jobInfo.heart)
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [client, setClient] = useState({
    jobsNumber: "73",
    totalSpent: "DZD 1.4K",
    joinDate: "Jan 25, 2010",
  });
  const [activity, setActivity] = useState({
    proposalsNumber: "33",
    lastViewed:
      "Sun Apr 28 2024 07:48:56 GMT+0100 (Central European Standard Time)", // hadi dirha bel date fct ta3 js 3adi
    interviewingNumber: "1",
    invitesNumber: "0",
    hiredNumber: "0",
  });
  useEffect(()=>{
    setIsSaved(jobInfo.heart);
  },[jobInfo.heart])
  const heartClick = async () => {
    let response;
    console.log(jobInfo);
    console.log(isSaved);
    setIsSaved(!isSaved);
    if (!isSaved) {
      response = await axios.patch('/api/jobs/addSavedJob', { id: jobInfo.id });
      console.log(response.data);
    } else {
      response = await axios.patch('/api/jobs/suppSavedJob', { id: jobInfo.id });
      console.log(response.data);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <AlertMessage
        showAlert={showAlert}
        variant="destructive"
        onClose={() => setShowAlert(false)}
        message="This job is no longer available."
      />
      <div className="flex space-x-4">
        <div className="space-y-4">
          <JobPost jobInfo={jobInfo} edit={false} title={true} />
          <Separator />
          <JobActivity activity={activity} />
        </div>

        <Separator orientation="vertical" className="h-[800px] w-1" />
        <div className="flex-none flex flex-col gap-16 mt-8">
          {apply ? (
            <div className="flex flex-col gap-3">
              {/* TODO: khdem el apply */}
              <Button onClick={() => { navigate(`/submitProposal/${jobInfo.id}`);}}>Apply Now</Button>
              {/* TODO: khdem el save */}
              <Button
                onClick={

                  heartClick
                }
                variant="outline"
              >
                <Heart className={isSaved ? "fill-primary mr-2" : "mr-2"} />
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
    </div>
  );
}

export default Job;
