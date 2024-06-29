import { React, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import JobList from "@/components/jobListAllJobPost/JobList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hi from "@/components/common/Hi";
import SearchBar from "@/components/searchBar/SearchBar";
import ExpertList from "@/components/expertList/ExpertList";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/search-tabs";
export default function AllJobPosts({ jobs, name }) {
    /* const [jobs, setJobs] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/dashboard');
      console.log("response.data",response.data);
      if (response.data) {
        setJobs(response.data.jobs);
      }
    }
    fetchData();
  }, [])
if(jobs) */
    
    const [experts, setExperts] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/savedExperts");
            console.log(response.data);
            if (response.data.redirectUrl) navigate(response.data.redirectUrl);
            if (response.data) {
                const exp = response.data.map((e) => ({
                    id: e._id,
                    name: `${e.name.first} ${e.name.last}`,
                    avatarUrl: e.profile.photoProfile.url,
                    role: e.profile.subCategory,
                    wilaya: e.wilaya,
                    city: e.city,
                    heart: true,
                    rating: e.profile.rate,
                    isClient: true,
                }));
                console.log(exp);
                setExperts(exp);
            }
            
        };
        fetchData();
    }, []);
    
    
    return (
        <>
            <Header />
            <PageContainer>
                <Hi name={name} />
                <SearchBar full />
                <div className="flex items-center justify-between pt-4">
                    <h1 className="text-black font-header text-4xl font-semibold">
                        All Job Posts
                    </h1>
                    <Link to="/jobSlides" className="text-white">
                        <Button variant="default" size="lg">
                            post a new job
                        </Button>
                    </Link>
                </div>
                <div className=" flex flex-col items-center mt-6">
                    <Tabs defaultValue="open" className="mt-4 w-full">
                        <TabsList className="">
                            <TabsTrigger value="open">Open</TabsTrigger>
                            <TabsTrigger value="closed">Closed</TabsTrigger>
                            <TabsTrigger value="savedExperts">
                                Saved Geoworkers
                            </TabsTrigger>
                            <div className="flex-grow h-full flex items-center justify-start px-4 py-2 text-sm font-medium relative before:absolute before:left-[-1px] before:bottom-0 before:right-0 before:h-0.5  before:rounded-full before:bg-greyCold">
                                <p className=" opacity-0">f</p>
                            </div>
                        </TabsList>
                        <TabsContent value="open">
                            <div className="flex flex-col items-center mt-4">
                                <JobList jobs={jobs} closed={false} />
                            </div>
                        </TabsContent>
                        <TabsContent value="closed">
                            <div className="flex flex-col items-center mt-4">
                                <JobList jobs={jobs} closed={true} />
                            </div>
                        </TabsContent>
                        <TabsContent value="savedExperts">
                            <div className="flex flex-col items-center mt-4">
                                <ExpertList experts={experts} />
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
