import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { React, useState } from "react";

import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";

import DeleteJobPost from "@/components/jobPost/DeleteJobPost";
import JobPost from "@/components/jobPost/JobPost";
import ExpertList from "@/components/expertList/ExpertList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
export default function JobPostPage() {
  const [edit, setEdit] = useState(false); // State to control the visibility of edit components
  // TODO: rod jobInfo yjiib l data ta3ha mel server doka ani dayer ghi dummy data
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
  const [oldJobInfo, setOldJobInfo] = useState(jobInfo);

  // Function to update job information
  const updateJobInfo = (newInfo) => {
    setJobInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  function SaveJobInfo() {
    //TODO: hna diir save lel job info fel server
    console.log(jobInfo);
  }

  return (
    <>
      <Header />
      <PageContainer>
        <div className="flex items-center justify-between relative ">
          <h1 className="text-black font-header text-4xl font-semibold">
            {jobInfo.title}
          </h1>
          <div className="absolute top-0 right-1 ">
            {edit && (
              <EditTitleButton
                title={jobInfo.title}
                onEdit={(newTitle) => {
                  updateJobInfo({
                    title: newTitle,
                  });
                }}
              />
            )}
          </div>
        </div>
        <Tabs defaultValue="viewJobPost" className="mt-4">
          <TabsList className="">
            <TabsTrigger value="viewJobPost">View Job Post</TabsTrigger>
            <TabsTrigger value="inviteExperts">Invite Experts</TabsTrigger>
          </TabsList>
          <TabsContent value="viewJobPost">
            {/* Your existing JSX here, wrap it in a div if needed */}
            <div className="flex flex-col space-y-4 mt-6 ">
              <JobPost
                jobInfo={jobInfo}
                updateJobInfo={updateJobInfo}
                edit={edit}
                title={false}
              />
              {!edit ? (
                <div className="flex items-center justify-end gap-4">
                  {" "}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEdit(true);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" /> edit job post
                  </Button>
                  {/* TODO: on delete hot fiha fct li t supp l job post w tdiik lel home (all job posts) */}
                  <DeleteJobPost onDelete={() => {}} />
                </div>
              ) : (
                <div className="flex items-center justify-end gap-4">
                  {" "}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEdit(false);
                      setJobInfo(oldJobInfo);
                    }}
                  >
                    Cancel
                  </Button>
                  {/* TODO: diir save lel job info fel base de donne fel onclick */}
                  <Button
                    size="sm"
                    onClick={() => {
                      SaveJobInfo();
                      setEdit(false);
                      setOldJobInfo(jobInfo);
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" /> Save
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          <TabsContent value="inviteExperts">
            <div className=" flex flex-col items-center mt-6">
              <ExpertList />
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
      <Footer />
    </>
  );
}
