import React, { useEffect, useState } from "react";
import WelcomCli from "../components/welcomeSections/WelcomCli";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  if (loading) return <div></div>;
  return (
    <div className="h-screen flex items-center">
      <WelcomCli firstName={name} />
    </div>
  );
}
