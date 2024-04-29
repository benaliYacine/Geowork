import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { React, useState, useEffect } from "react";
import axios from 'axios';

import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteJobPost from "@/components/jobPost/DeleteJobPost";
import JobPost from "@/components/jobPost/JobPost";
import ExpertList from "@/components/expertList/ExpertList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/common/SearchBar";
export default function JobPostPage() {
  const { id } = useParams();
  const [edit, setEdit] = useState(false); // State to control the visibility of edit components
  // TODO: rod jobInfo yjiib l data ta3ha mel server doka ani dayer ghi dummy data
  const [jobInfo, setJobInfo] = useState(null);
  const [oldJobInfo, setOldJobInfo] = useState(jobInfo);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/jobPostPage/${id}`);
      if (response.data) {
        const images = response.data.images.map((c) => (c.url));
        console.log(images);
        setJobInfo({ ...response.data, images });
      }
    }
    fetchData();
  }, [])

  // Function to update job information
  const updateJobInfo = async (newInfo) => {
    setJobInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  const DeleteJob = async () => {
    const response = await axios.delete(`/api/jobs/deleteJob/${id}`);
    if (response.data) {
      navigate('/dashboard');
    }
  };
  async function SaveJobInfo() {
    console.log(jobInfo);
    const images = jobInfo.images.map((i) => {
      const startIndex = i.indexOf('/Geolans/');
      const endIndex = i.indexOf('.png');
      if (startIndex !== -1 && endIndex !== -1) {
        const extractedString = i.substring(startIndex + 1, endIndex);
        return { filename: extractedString, url: i };
      } else {
        console.log("La partie de l'URL que vous recherchez n'a pas été trouvée.");
        return ({})
      }

    })
    console.log('images',images)
    const saveInfo = { ...jobInfo, images };
    console.log('saveInfo',saveInfo);
    const response = await axios.patch(`/api/jobs/changeJob/${id}`, saveInfo)

  }
  if (jobInfo)
    return (
      <>
        <Header />
        <PageContainer>
          <SearchBar />
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
                    <DeleteJobPost onDelete={DeleteJob} />
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
