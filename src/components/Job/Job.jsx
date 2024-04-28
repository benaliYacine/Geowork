import { Button } from "@/components/ui/button";
import { React, useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import JobPost from "@/components/jobPost/JobPost";
import { Heart } from "lucide-react";
import AboutClient from "@/components/Job/AboutClient";
import JobActivity from "@/components/Job/JobActivity";
import { useNavigate, useParams } from "react-router-dom";
function Job({ jobInfo, apply = false }) {
  const navigate = useNavigate();

  const [isSaved, setIsSaved] = useState(false);
  return (
    <div className="flex space-x-4">
      <div className="space-y-4">
        <JobPost jobInfo={jobInfo} edit={false} title={true} />
        <Separator/>
        <JobActivity />
      </div>

      <Separator orientation="vertical" className="h-[800px] w-1"/>
      <div className="flex-none flex flex-col gap-16 mt-8">
        {apply ? (
          <div className="flex flex-col gap-3">
            {/* TODO: khdem el apply */}
            <Button onClick={() => {}}>Apply Now</Button>
            {/* TODO: khdem el save */}
            <Button
              onClick={() => {
                setIsSaved(!isSaved);
              }}
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

        <AboutClient />
      </div>
    </div>
  );
}

export default Job;
