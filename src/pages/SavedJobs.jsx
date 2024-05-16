import { React, useState, useEffect } from "react";
import JobList from "@/components/jobList/JobList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
export default function SavedJobs() {
  const navigate = useNavigate();
  const [jobs, setjobs] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/savedJobs');
      console.log(response.data);
      if(response.data.redirectUrl)
        navigate(response.data.redirectUrl);
      if (response.data) {
        setjobs(response.data);
      }
      setLoading(false);
    }
    fetchData();
  }, [])
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
          <SearchBar full />
          <div className="flex items-start flex-col justify-between">
            <Button
              variant="link"
              size="sm"
              className="mb-2"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className=" stroke-[1.5px] " />
              Return
            </Button>
            {/* <Separator className="mb-2" /> */}
            <h1 className="text-black font-header text-4xl font-semibold ">
              Saved Jobs
            </h1>
          </div>
          <div className=" flex flex-col items-start mt-6">
            <JobList jobs={jobs} />
          </div>
        </PageContainer>
        <Footer />
      </>
    );
}
