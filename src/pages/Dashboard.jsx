import { useState, useEffect } from "react";
import axios from "axios";
import ProfilePage from './ProfilePage';
import AllJobPosts from './AllJobPosts';
import { useNavigate } from "react-router-dom";
export default function Dashboard() {
    const [info, setInfo] = useState({});
    const [jobs, setJobs] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/dashboard');
                console.log(response.data);
                if (response.data.redirectUrl) {
                    navigate(response.data.redirectUrl);
                }
                if (response.data) {
                    setLoading(false);
                    if ('profile' in response.data) {
                        setProfileInfo(response.data.profile);
                        const info = {
                            name: `${response.data.name.first} ${response.data.name.last}`,
                            wilaya: response.data.wilaya,
                            city: response.data.city
                        }
                        setInfo(info);

                    } else {
                        setJobs(response.data.jobs);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

    }, []);
    const updateProfileInfo = (newInfo) => {
        console.log("newInfo:::", newInfo)
        setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
    };
    if (loading) return <div></div>;
    if (profileInfo) {
        return (
            <ProfilePage info={info} profileInfo={profileInfo} updateProfileInfo={updateProfileInfo} />
        )
    } else {
        return (
            <AllJobPosts jobs={jobs} />
        )
    }
}