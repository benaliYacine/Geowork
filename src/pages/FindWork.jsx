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
export default function FindWork({}) {
  return (
    <>
      <Header />
      <PageContainer>
        <Hi name="Benali" />
        <SearchBar full />
        <div className="flex items-center justify-between">
          <h1 className="text-black font-header text-4xl font-semibold">
            Jobs you might like
          </h1>
        </div>
        <div className=" flex flex-col items-center mt-6">
          <JobList />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
//}
