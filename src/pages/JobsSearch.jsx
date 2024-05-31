import { React, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import JobList from "@/components/jobList/JobList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
import { nullable } from "zod";
export default function AllJobPosts() {
    const location = useLocation();
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("hiiii"); 
        const fetchData = async () => {
            const searchParams = new URLSearchParams(location.search);
            const category = searchParams.get("category");
            const subCategory = searchParams.get("subCategory");
            const wilaya = searchParams.get("wilaya");
            const city = searchParams.get("city");

            console.log("Category:", category);
            console.log("Subcategory:", subCategory);
            console.log("Wilaya:", wilaya);
            console.log("City:", city);
            const response = await axios.get("/jobsSearch", {
                params: {
                    category,
                    subCategory,
                    wilaya,
                    city,
                },
            });
            if (response.data.redirectUrl) {
                navigate(response.data.redirectUrl);
            }
            console.log("jooooobs",response.data)
            if (response.data) {
                let jobs = response.data;
                jobs = jobs.map((j) => {
                    return { ...j, images: j.images.map((j) => j.url) };
                });

                jobs = jobs.map((j) => ({
                    id: j._id,
                    title: j.title,
                    description: j.description,
                    images: j.images,
                    budget: j.budget,
                    category: j.category,
                    subCategory: j.subCategory,
                    wilaya: j.wilaya,
                    city: j.city,
                    heart: j.heart,
                    isExpert: j.isExpert,
                    hires:j.hires,
                    proposals:j.proposals,
                    closed:j.closed,
                    hired:j.hired,
                    client:j.client
                }));
                setJobs(jobs);
                console.log("kkkkkk", jobs);
            }
        };
        fetchData();
    }, [location.search]);
    return (
        <>
            <Header />
            <PageContainer>
                <SearchBar full />
                <div className="flex items-center justify-between">
                    <h1 className="text-black font-header text-4xl font-semibold ">
                        Search results
                    </h1>
                </div>
                <div className=" flex flex-col items-center mt-6">
                    <JobList jobs={jobs} />
                </div>
            </PageContainer>
            <Footer />
        </>
    );
}
