import React, { useEffect, useState } from "react";
import WelcomCli from "../components/welcomeSections/WelcomCli";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import PropagateLoader from "react-spinners/PropagateLoader";
import SearchBar from "@/components/searchBar/SearchBar";

export default function WelcomeCli() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/welcomeCli");
        console.log(response);
        if (response.data.redirectUrl) {
          navigate(response.data.redirectUrl);
        } else setLoading(false);
        if (response.data) {
          setName(response.data.name.first);
        }
      } catch (error) {
        console.error(error);
        // Handle error here, if needed
      }
    };

    fetchData();
  }, []);
  if (loading) return (
    <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
      <PropagateLoader color="#FF5400" />
    </div>
  );
  return (
    <>
      <Header />
      <PageContainer>
        <SearchBar />
        <div className="h-screen flex items-center">
          <WelcomCli firstName={name} />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
