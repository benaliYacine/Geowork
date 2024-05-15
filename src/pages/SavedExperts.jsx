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
export default function SavedExperts() {
  const navigate = useNavigate();
  const [experts, setExperts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/savedExperts');
      console.log(response.data);
      if (response.data) {
        const exp=response.data.map((e)=>({id:e._id,name:`${e.name.first} ${e.name.last}`,avatarUrl:e.profile.photoProfile.url,role:e.profile.subCategory,wilaya:e.wilaya,city:e.city,heart:true,rating:e.profile.rate,isClient:true}));
        console.log(exp);
        setExperts(exp);
      }
    }
    fetchData();
  }, [])
  if (experts)
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
