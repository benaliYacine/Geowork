import { React, useState, useEffect } from "react";
import axios from 'axios';
import ExpertList from "@/components/expertList/ExpertList";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import SearchBar from "@/components/searchBar/SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import PropagateLoader from "react-spinners/PropagateLoader";

export default function SavedExperts() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/savedExperts');
      console.log(response.data);
      if(response.data.redirectUrl)
        navigate(response.data.redirectUrl);
      if (response.data) {
        const exp=response.data.map((e)=>({id:e._id,name:`${e.name.first} ${e.name.last}`,avatarUrl:e.profile.photoProfile.url,role:e.profile.subCategory,wilaya:e.wilaya,city:e.city,heart:true,rating:e.profile.rate,isClient:true}));
        console.log(exp);
        setExperts(exp);
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
            <h1 className="text-black font-header text-4xl font-semibold">
              Saved Experts
            </h1>
          </div>
          <div className=" flex flex-col items-center mt-6">
            <ExpertList experts={experts} />
          </div>
        </PageContainer>
        <Footer />
      </>
    );
}
