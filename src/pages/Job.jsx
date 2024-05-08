import { React, useState, useEffect, useRef } from "react";
import axios from 'axios';
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Job from "@/components/Job/Job";
import SearchBar from "@/components/searchBar/SearchBar";
import { useParams } from 'react-router-dom';
export default function Jobs() {
  
  const [jobInfo, setJobInfo] = useState({
    title: "na7ihom memba3d ",
    category: "education_and_tutoring",
    subCategory: "math_tutor",
    wilaya: "alger",
    city: "sidi_moussa",
    budget: "DZD  5, 500",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque odio inventore, aliquid voluptatem natus consectetur perferendis, quo distinctio, consequatur unde numquam earum ipsum iste sit. In porro deleniti ut ea.",
    images: [
      "https://placebear.com/g/200/200",
      "https://source.unsplash.com/user/c_v_r/1900×800",
      "https://via.placeholder.com/300.png/09f/fff",
    ],
  });
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
