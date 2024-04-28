import { Button } from "@/components/ui/button";
import { React, useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import JobPost from "@/components/jobPost/JobPost";
import { Heart } from "lucide-react";
import AboutClient from "@/components/Job/AboutClient";
import JobActivity from "@/components/Job/JobActivity";
import { useNavigate, useParams } from "react-router-dom";
function Job({ jobInfo, apply = false }) {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    // deert hadi bah nhot el hight ta3 div lakhaterh kou thoto h-fit el separator el h-full ta3ou matenchich lazem hada div ykoun el hieght ta3ou fix mechi fit wela ... aya hadi el useeffect tchouf el content ta3ou chhal el hieght ta3ou w tmedou l hada el div tema tkeli dert h-fit mais h-full ta3 separator temchi normal
    if (containerRef.current) {
      const children = containerRef.current.children;
      let maxHeight = 0;
      Array.from(children).forEach((child) => {
        if (child.offsetHeight > maxHeight) {
          maxHeight = child.offsetHeight;
        }
      });
      Array.from(children).forEach((child) => {
        child.style.height = `${maxHeight}px`;
      });
    }
  }, []);
  const [isSaved, setIsSaved] = useState(false);

  return (
    <div ref={containerRef} className="flex h-fit space-x-4">
      <div className="space-y-4">
        <JobPost jobInfo={jobInfo} edit={false} title={true} />
        <Separator />
        <JobActivity />
      </div>

      <Separator orientation="vertical" />
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
