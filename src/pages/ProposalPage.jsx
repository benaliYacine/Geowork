import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/profile/Profile";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import SearchBar from "@/components/searchBar/SearchBar";
import { useParams } from "react-router-dom";
import Proposal from "@/components/proposalList/Proposal";
import PropagateLoader from "react-spinners/PropagateLoader";
export default function ProfilePage() {
    const { id } = useParams();
    const [info, setInfo] = useState(null);
    const [profileInfo, setProfileInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`/proposal/${id}`);
            console.log("response.data", response.data);
            if (response.data) {
                setInfo({
                    id:id,
                    jobId:response.data.message.jobId,
                    proId:response.data._id,
                    state:response.data.message.state,
                    name: `${response.data.name.first} ${response.data.name.last}`,
                    role: response.data.profile.subCategory,
                    rating: response.data.rating,
                    avatarUrl: response.data.profile.photoProfile,
                    wilaya: response.data.wilaya,
                    city: response.data.city,
                    budget: response.data.message.budget,
                    coverLetter: response.data.message.coverLetter,
                });
                setProfileInfo(
                    response.data.profile
                );
            }
            setLoading(false);
        };
        fetchData();
    }, []);
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
                    <Proposal
                        proposal={info}
                        profileInfo={profileInfo}
                        coverLetter={info.coverLetter}
                        budget={info.budget}
                        action={true}
                    />
                </PageContainer>
                <Footer />
            </>
        );
}
