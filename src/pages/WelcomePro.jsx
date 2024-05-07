import React, { useEffect, useState } from "react";
import WelcomPro from "../components/welcomeSections/WelcomPro";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import PropagateLoader from "react-spinners/PropagateLoader";
export default function WelcomePro() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/welcomePro");
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
        <div className="h-screen flex items-center">
          <WelcomPro firstName={name} />
        </div>
      </PageContainer>
      <Footer />
    </>
  );
}
