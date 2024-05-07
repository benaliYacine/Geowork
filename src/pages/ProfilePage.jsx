import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "@/components/profile/Profile";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PageContainer from "@/components/common/PageContainer";
import SearchBar from "@/components/searchBar/SearchBar";
export default function ProfilePage({ info, profileInfo, updateProfileInfo }) {
  /* const [info, setInfo] = useState({});
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ok")
        const response = await axios.get('/dashboard');
        console.log(response.data);
        if (response.data) {
          setProfileInfo(response.data.profile);
          const info = {
            name: `${response.data.name.first} ${response.data.name.last}`,
            wilaya: response.data.wilaya,
            city: response.data.city
          }
          setInfo(info);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);
 */

  /* const updateProfileInfo = (newInfo) => {
    console.log("newInfo:::",newInfo)
    setProfileInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  }; */
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
            edit={true}
          />
        </PageContainer>
        <Footer />
      </>
    );
}
