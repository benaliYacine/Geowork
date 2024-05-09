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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/search-tabs";

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
        <div className=" flex flex-col items-center">
          <Tabs defaultValue="BestMatches" className="mt-4 w-full">
            <TabsList className="">
              <TabsTrigger value="BestMatches">Best Matches</TabsTrigger>
              <TabsTrigger value="savedJobs">Saved Jobs</TabsTrigger>
              <div className="flex-grow h-full flex items-center justify-start px-4 py-2 text-sm font-medium relative before:absolute before:left-[-1px] before:bottom-0 before:right-0 before:h-0.5  before:rounded-full before:bg-greyCold">
                <p className=" opacity-0">f</p>
              </div>
            </TabsList>
            <TabsContent value="BestMatches">
              <div className="flex flex-col items-center mt-4">
                <JobList />
              </div>
            </TabsContent>
            <TabsContent value="savedJobs">
              <div className="flex flex-col items-center mt-4">
                <JobList />
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
