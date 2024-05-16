import { React, useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import JobList from "@/components/jobList/JobList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Hi from "@/components/common/Hi";
import SearchBar from "@/components/searchBar/SearchBar";
export default function AllJobPosts({ jobs,name }) {
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
  return (
    <>
      <Header />
      <PageContainer>
        <Hi name={name} />
        <SearchBar full />
        <div className="flex items-center justify-between">
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
          <JobList jobs={jobs} />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
//}
