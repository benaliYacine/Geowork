import { React, useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import JobPost from "@/components/jobPost/JobPost";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { Heart } from "lucide-react";
import AboutClient from "@/components/Job/AboutClient";
import JobActivity from "@/components/Job/JobActivity";
export default function Job() {
  const [jobInfo, setJobInfo] = useState({
    title: "na7ihom memba3d ",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "alger",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
    images: [
      "https://placebear.com/g/200/200",
      "https://source.unsplash.com/user/c_v_r/1900×800",
      "https://via.placeholder.com/300.png/09f/fff",
    ],
  });

  const containerRef = useRef(null);
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
    <>
      <Header />
      <PageContainer>
        <div ref={containerRef} className="flex h-fit space-x-4">
          <div className="space-y-4">
            <JobPost jobInfo={jobInfo} edit={false} title={true} />
            <Separator />
            <JobActivity/>
          </div>

          <Separator orientation="vertical" />
          <div className="flex-none flex flex-col gap-16 mt-8">
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
            <AboutClient />
          </div>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
