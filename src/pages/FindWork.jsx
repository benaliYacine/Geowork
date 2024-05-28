import { React, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import JobList from "@/components/jobList/JobList";
import { useNavigate } from "react-router-dom";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hi from "@/components/common/Hi";
import PropagateLoader from "react-spinners/PropagateLoader";
import SearchBar from "@/components/searchBar/SearchBar";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/search-tabs";

export default function FindWork({ name = "" }) {
    const [jobs, setJobs] = useState([]);
    const [jobsMatch, setJobsMatch] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const response2 = await axios.get("/findWork");
            console.log("response2...", response2);
            if (response2.data) {
                const info = response2.data.map((r) => ({
                    ...r,
                    id: r._id,
                    isExpert: true,
                }));
                console.log(info);
                setJobsMatch(info);
                console.log("JobsMatch", response2.data);
            }
            if (response2.data.redirectUrl) {
                navigate(response2.data.redirectUrl);
            }
            setLoading(false);
            const response1 = await axios.get("/savedJobs");
            console.log("response",response1)
            if (response1.data) {
                setJobs(response1.data);
            }
        };
        fetchData();
    }, []);
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    return (
        <>
            <Header />
            <PageContainer>
                <Hi name={name} />
                <SearchBar full />
                <div className="flex items-center justify-between">
                    <h1 className="text-black font-header text-4xl font-semibold">
                        Jobs you might like
                    </h1>
                </div>
                <div className=" flex flex-col items-center">
                    <Tabs defaultValue="BestMatches" className="mt-4 w-full">
                        <TabsList className="">
                            <TabsTrigger value="BestMatches">
                                Best Matches
                            </TabsTrigger>
                            <TabsTrigger value="savedJobs">
                                Saved Jobs
                            </TabsTrigger>
                            <div className="flex-grow h-full flex items-center justify-start px-4 py-2 text-sm font-medium relative before:absolute before:left-[-1px] before:bottom-0 before:right-0 before:h-0.5  before:rounded-full before:bg-greyCold">
                                <p className=" opacity-0">f</p>
                            </div>
                        </TabsList>
                        <TabsContent value="BestMatches">
                            <div className="flex flex-col items-center mt-4">
                                <JobList jobs={jobsMatch} />
                            </div>
                        </TabsContent>
                        <TabsContent value="savedJobs">
                            <div className="flex flex-col items-center mt-4">
                                <JobList jobs={jobs} />
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </PageContainer>
            <Footer />
        </>
    );
}
//}
