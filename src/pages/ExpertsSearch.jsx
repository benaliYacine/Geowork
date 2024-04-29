import { React, useState } from "react";
import ExpertList from "@/components/expertList/ExpertList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
export default function ExpertsSearch() {
  return (
    <>
      <Header />
      <PageContainer>
        <SearchBar full />
        <div className="flex items-center justify-between">
          <h1 className="text-black font-header text-4xl font-semibold">
            Search results
          </h1>
        </div>
        <div className=" flex flex-col items-center mt-6">
          <ExpertList />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
