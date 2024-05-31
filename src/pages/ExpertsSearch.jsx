import { React, useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ExpertList from "@/components/expertList/ExpertList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
import JobSuccess from "../components/common/JobSuccess";
export default function ExpertsSearch() {
  const location = useLocation();
  const [experts,setExperts]=useState([]);
  useEffect(() => {
    console.log("hiiii");
    const fetchData = async () => {
      
      const searchParams = new URLSearchParams(location.search);
      const category = searchParams.get('category');
      const subCategory = searchParams.get('subCategory');
      const wilaya = searchParams.get('wilaya');
      const city = searchParams.get('city');

      console.log('Category:', category);
      console.log('Subcategory:', subCategory);
      console.log('Wilaya:', wilaya);
      console.log('City:', city);
      const response = await axios.get('/expertsSearch', {
        params: {
          category,
          subCategory,
          wilaya,
          city,
        }
      });
      if (response.data) {
        console.log("response",response.data);
        let expert=response.data;
        expert = expert.map((e) => ({
            id: e._id,
            name: `${e.name.first} ${e.name.last}`,
            role: e.profile.subCategory,
            rating: e.profile.rating,
            avatarUrl: e.profile.photoProfile.url,
            wilaya: e.wilaya,
            city: e.city,
            heart: e.heart,
            isClient: e.isClient,
            JobSuccess:
                Math.floor((e.profile.jobs.filter((j) => j.closed).length /
                    (e.profile.jobs.filter((j) => j.closed).length +
                    e.profile.numJobCanceled
                        ? e.profile.jobs.filter((j) => j.closed).length +
                          e.profile.numJobCanceled
                        : 1)) *
                100),
        }));
        console.log(expert);
        setExperts(expert);
/*         let experts=response.data;
        experts=jobs.map((j)=>{
          return {...j,images:j.images.map((j)=>(j.url))}
        });
        jobs=jobs.map((j)=>({title:j.title,description:j.description,images:j.images,budget:j.budget,category:j.category,subCategory:j.subCategory,wilaya:j.wilaya,city:j.city}));
        setJobs(jobs);
        console.log("kkkkkk",jobs); */
      }
    }
    fetchData();
  }, [location.search])
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
          <ExpertList experts={experts}/>
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
