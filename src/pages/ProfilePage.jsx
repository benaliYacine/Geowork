import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/profile/Profile";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import SearchBar from "@/components/searchBar/SearchBar";
import PropagateLoader from "react-spinners/PropagateLoader";
import { useNavigate, useParams } from "react-router-dom";
export default function ProfilePage() {
    const [info, setInfo] = useState({});
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [edit, setEdit] = useState(id ? false : true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    console.log("ok");
                    const response = await axios.get("/profileProfessionnel");
                    console.log(response.data);
                    if (response.data.redirectUrl) {
                        navigate(response.data.redirectUrl);
                    }
                    if (response.data) {
                        setLoading(false);
                        setProfileInfo(response.data.profile);
                        console.log("profile....", response.data.profile);
                        const info = {
                            name: `${response.data.name.first} ${response.data.name.last}`,
                            wilaya: response.data.wilaya,
                            city: response.data.city,
                            rating:response.data.profile.rating
                        };
                        setInfo(info);
                    }
                } else {
                    console.log("ok");
                    const response = await axios.get(`/expertInfo/${id}`);
                    console.log(response.data);
                    console.log(
                        "response.data.profile.rating",
                        response.data.profile.rating
                    );
                    if (response.data.redirectUrl) {
                        navigate(response.data.redirectUrl);
                    }
                    if (response.data) {
                        setLoading(false);
                        setProfileInfo(response.data.profile);
                        console.log("profile....", response.data.profile);
                        const info = {
                            name: `${response.data.name.first} ${response.data.name.last}`,
                            wilaya: response.data.wilaya,
                            city: response.data.city,
                            rating: response.data.profile.rating,
                        };
                        
                        setInfo(info);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const updateProfileInfo = (newInfo) => {
        console.log("newInfo:::", newInfo);
        setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
    };
    if (loading)
        return (
            <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
                <PropagateLoader color="#FF5400" />
            </div>
        );
    if (profileInfo)
        return (
            <>
                <Header />
                <PageContainer>
                    <SearchBar />
                    <Profile
                        expert={info}
                        profileInfo={profileInfo}
                        updateProfileInfo={updateProfileInfo}
                        edit={edit}
                    />
                </PageContainer>
                <Footer />
            </>
        );
}
