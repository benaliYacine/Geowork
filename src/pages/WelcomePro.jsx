import React, { useEffect, useState } from "react";
import WelcomPro from "../components/welcomeSections/WelcomPro";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  if (loading) return <div></div>;
  return (
    <div className="h-screen flex items-center">
      <WelcomPro firstName={name} />
    </div>
  );
}
