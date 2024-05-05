import { React, useState } from "react";
import JobList from "@/components/jobList/JobList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
export default function SavedJobs() {
  const navigate = useNavigate();
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
          <JobList />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
