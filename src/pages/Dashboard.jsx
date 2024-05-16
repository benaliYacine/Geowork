import { useState, useEffect } from "react";
import axios from "axios";
import ProfilePage from "./ProfilePage";
import AllJobPosts from "./AllJobPosts";
import { useNavigate } from "react-router-dom";
import FindWork from "./FindWork";

import PropagateLoader from "react-spinners/PropagateLoader";
export default function Dashboard() {
    const [info, setInfo] = useState({});
    const [jobs, setJobs] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/dashboard");
                console.log(response.data);
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                }
                if (response.data) {
                    setLoading(false);
                    if ("profile" in response.data) {
                        setProfileInfo(response.data.profile);
                        const info = {
                            name: `${response.data.name.first} ${response.data.name.last}`,
                            firstName: `${response.data.name.first}`,
                            wilaya: response.data.wilaya,
                            city: response.data.city,
                        };
                        setInfo(info);
                    } else {
                        if (response.data.jobs) {
                            const jobs = response.data.jobs.map((j) => {
                                const images = j.images.map((i) => i.url);
                                return { ...j, images };
                            });
                            console.log("jobs", jobs);

                            setJobs(jobs);
                        }
                        if(response.data){
                            setInfo({ firstName: response.data.name.first});
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    if (profileInfo) {
        return <FindWork name={info.firstName} />;
    } else {
        return <AllJobPosts jobs={jobs} name={info.firstName} />;
    }
}
