import { React } from "react";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import JobList from "@/components/jobList/JobList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
export default function AllJobPosts() {
  return (
    <>
      <Header />
      <PageContainer>
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
          <JobList />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
