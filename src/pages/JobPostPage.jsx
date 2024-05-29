import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { React, useState, useEffect } from "react";
import axios from "axios";

import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import { Button } from "@/components/ui/button";
import { Pencil, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import DeleteJobPost from "@/components/jobPost/DeleteJobPost";
import JobPost from "@/components/jobPost/JobPost";
import ExpertList from "@/components/expertList/ExpertList";
import ProposalList from "@/components/proposalList/ProposalList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
import PropagateLoader from "react-spinners/PropagateLoader";
import AlertMessage from "@/components/common/AlertMessage";

export default function JobPostPage() {
    const [alertMessage, setAlertMessage] = useState("test test ");
    const [showAlert, setShowAlert] = useState(false);
    const { id } = useParams();
    const [edit, setEdit] = useState(false); // State to control the visibility of edit components
    // TODO: rod jobInfo yjiib l data ta3ha mel server doka ani dayer ghi dummy data
    const [jobInfo, setJobInfo] = useState(null);
    const [oldJobInfo, setOldJobInfo] = useState(jobInfo);
    const navigate = useNavigate();
    const [experts, setExperts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/jobPostPage/${id}`);
            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
            if (response.data) {
                setLoading(false);
                const images = response.data.images.map((c) => c.url);
                console.log(images);
                setJobInfo({ ...response.data, images });
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        console.log("hiiii");
        const fetchData = async () => {
            const category = jobInfo.category;
            const subCategory = jobInfo.subCategory;
            const wilaya = jobInfo.wilaya;
            const city = jobInfo.city;

            console.log("Category:", category);
            console.log("Subcategory:", subCategory);
            console.log("Wilaya:", wilaya);
            console.log("City:", city);
            const response = await axios.get(
                `/expertsSearch?category=${category}&subCategory=${subCategory}&wilaya=${wilaya}&city=${city}`
            );

            console.log("response awadi", response.data);
            if (response.data) {
                console.log("response", response.data);
                let expert = response.data;
                expert = expert.map((e) => ({
                    id: e._id,
                    name: `${e.name.first} ${e.name.last}`,
                    role: e.profile.subCategory,
                    rating: e.profile.rating,
                    avatarUrl: e.profile.photoProfile.url,
                    wilaya: e.wilaya,
                    city: e.city,
                    heart: e.heart,
                    isClient: e.isClient,
                    JobSuccess:
                        (e.profile.jobs.filter((j) => j.closed).length /
                            (e.profile.jobs.filter((j) => j.closed).length +
                            e.profile.numJobCanceled
                                ? e.profile.jobs.filter((j) => j.closed)
                                      .length + e.profile.numJobCanceled
                                : 1)) *
                        100,
                }));
                console.log(expert);
                setExperts(expert);
                /*         let experts=response.data;
                experts=jobs.map((j)=>{
                  return {...j,images:j.images.map((j)=>(j.url))}
                });
                jobs=jobs.map((j)=>({title:j.title,description:j.description,images:j.images,budget:j.budget,category:j.category,subCategory:j.subCategory,wilaya:j.wilaya,city:j.city}));
                setJobs(jobs);
                console.log("kkkkkk",jobs); */
            }
        };
        fetchData();
    }, [jobInfo]);

    // Function to update job information
    const updateJobInfo = async (newInfo) => {
        setJobInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
    };

    const DeleteJob = async () => {
        setDeleting(true);
        const response = await axios.delete(`/api/jobs/deleteJob/${id}`);
        if (response.data) {
            navigate("/dashboard");
        }
        setDeleting(false);
    };
    async function SaveJobInfo() {
        console.log(jobInfo);
        const images = jobInfo.images.map((i) => {
            const startIndex = i.indexOf("/Geolans/");
            const endIndex = i.indexOf(".png");
            if (startIndex !== -1 && endIndex !== -1) {
                const extractedString = i.substring(startIndex + 1, endIndex);
                return { filename: extractedString, url: i };
            } else {
                console.log(
                    "La partie de l'URL que vous recherchez n'a pas été trouvée."
                );
                return {};
            }
        });
        console.log("images", images);
        const saveInfo = { ...jobInfo, images };
        console.log("saveInfo", saveInfo);
        const response = await axios.patch(
            `/api/jobs/changeJob/${id}`,
            saveInfo
        );
    }

    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    if (jobInfo)
        return (
            <>
                <AlertMessage
                    showAlert={showAlert}
                    variant="destructive"
                    onClose={() => setShowAlert(false)}
                    message={alertMessage}
                />
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
                            <TabsTrigger value="viewJobPost">
                                View Job Post
                            </TabsTrigger>
                            <TabsTrigger value="inviteExperts">
                                Invite Experts
                            </TabsTrigger>
                            <TabsTrigger value="reviewProposals">
                                Review Proposals
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="viewJobPost">
                            {/* Your existing JSX here, wrap it in a div if needed */}
                            <div className="flex flex-col space-y-4 mt-6 mb-6">
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
                                            <Pencil className="h-4 w-4 mr-2" />{" "}
                                            edit job post
                                        </Button>
                                        {/* TODO: on delete hot fiha fct li t supp l job post w tdiik lel home (all job posts) */}
                                        <DeleteJobPost
                                            onDelete={DeleteJob}
                                            loading={deleting}
                                        />
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
                                            <Save className="h-4 w-4 mr-2" />{" "}
                                            Save
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                        <TabsContent value="inviteExperts">
                            <div className=" flex flex-col items-center mt-6">
                                <ExpertList experts={experts} />
                            </div>
                        </TabsContent>
                        <TabsContent value="reviewProposals">
                            <div className=" flex flex-col items-center mt-6">
                                <ProposalList />
                            </div>
                        </TabsContent>
                    </Tabs>
                </PageContainer>
                <Footer />
            </>
        );
}
