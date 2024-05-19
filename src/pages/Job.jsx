import { React, useState, useEffect, useRef } from "react";
import axios from 'axios';
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Job from "@/components/Job/Job";
import SearchBar from "@/components/searchBar/SearchBar";
import { useParams } from 'react-router-dom';
export default function Jobs() {
  
  const [jobInfo, setJobInfo] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    const fetchData = async () => {
      let response = await axios.get(`/jobPostPage/${id}`);
      response.data.id=response.data._id;
      response.data.images=response.data.images.map((i)=>(i.url));
      console.log('response.data',response.data);
      setJobInfo(response.data)
    }
    fetchData();
  },[])
if(jobInfo)
  return (
    <>
      <Header />
      <PageContainer>
        <SearchBar />
        <Job jobInfo={jobInfo} apply />
      </PageContainer>
      <Footer />
    </>
  );
}
