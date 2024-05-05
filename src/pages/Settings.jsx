import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/side-tabs";
import { React, useState, useEffect } from "react";
import axios from "axios";
import EditLocationButton from "@/components/settingsEdit/EditLocationButton";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import CloseAccount from "@/components/settings/CloseAccount";
import EditAccountButton from "@/components/settingsEdit/EditAccountButton";
import EditPasswordButton from "@/components/settingsEdit/EditPasswordButton";
import EditClientLocationButton from "@/components/settingsEdit/EditClientLocationButton";
import EditClientAccountButton from "@/components/settingsEdit/EditClientAccountButton";
import PageContainer from "@/components/common/PageContainer";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PropagateLoader from "react-spinners/PropagateLoader";
export default function Settings() {
  // TODO: rod userInfo yjiib l data ta3ha mel server doka ani dayer ghi dummy data
  const [userInfo, setUserInfo] = useState({
    name: { first: "John", last: "Smith" },
    email: "john@example.com",
    streetAdress: " tiaret tiaret asdf asd f",
    wilaya: "tiaret",
    city: "tiaret",
    phone: "05 55 55 55 55",
    password: "testtest",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [IsExpert, setIsExpert] = useState(false);
  
  // TODO: khdem b satate hada : rodo false ida kan l user dayer sign up b google w true sinon
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/settings");
      console.log(response.data);
      if (response.data.redirectUrl) {
        navigate(response.data.redirectUrl);
      } else setLoading(false);
      if (response.data) {
        const info = {
          name: response.data.name,
          email: response.data.email,
          streetAdress: response.data.profile.streetAdress,
          wilaya: response.data.wilaya,
          city: response.data.city,
          phone: response.data.profile.phone,
          type: "profile" in response.data ? "Expert" : "Client",
        };
        if (info.type == "Expert") setIsExpert(true);
        else setIsExpert(false);
        setUserInfo(info);
      }
    };
    fetchData();
  }, []);
  // Function to update user information
  const updateUserInfo = async (newInfo) => {
    const response = await axios.patch(
      "/api/professionnels/changeDetailleProfessionnel",
      newInfo
    );
    console.log(response.data);
    setUserInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };
  const closeAccount = async () => {
    console.log("delete");
    let response = await axios.delete(
      "/api/professionnels/deleteProfessionnel"
    );
    console.log(response.data);
    response = await axios.post("/logout");
    if (response.data.redirectUrl) navigate(response.data.redirectUrl);
  };
  if (loading)
    return (
      <div className="flex items-center justify-center w-full h-full min-h-screen min-w-screen">
        <PropagateLoader color="#FF5400" />
      </div>
    );
  return (
    <>
      <Header />
      <PageContainer>
        <div className="flex items-center justify-between ">
          <h1 className="text-black font-header text-4xl font-semibold">
            Settings
          </h1>
        </div>
        <Tabs defaultValue="MyInfo" className="my-6">
          <TabsList className="">
            <TabsTrigger value="MyInfo">My Info</TabsTrigger>
            <TabsTrigger value="PasswordAndSecurity">
              Password And Security
            </TabsTrigger>
          </TabsList>
          <TabsContent value="MyInfo">
            {/* Your existing JSX here, wrap it in a div if needed */}
            <div className="flex flex-col space-y-0 ">
              <div className="pl-2 pb-2">
                <h2 className="text-black font-header text-3xl font-bold">
                  My Info
                </h2>
              </div>

              <div className="flex flex-col space-y-6 bg-bg rounded-3xl p-6 border-0 border-greyCold relative">
                <h3 className="text-black font-header text-2xl font-bold">
                  Account
                </h3>
                <div className="flex flex-col space-y-2">
                  <h4 className="text-black font-header text-xl font-semibold">
                    Name
                  </h4>
                  <p className="text-greyDark font-sans text-lg">
                    {userInfo.name.first} {userInfo.name.last}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <h4 className="text-black font-header text-xl font-semibold">
                    Email
                  </h4>
                  <p className="text-greyDark font-sans text-lg">
                    {userInfo.email}
                  </p>
                </div>
                {IsExpert ? (
                  <>
                    <div className="flex flex-col space-y-2">
                      <h4 className="text-black font-header text-xl font-semibold">
                        Phone
                      </h4>
                      <p className="text-greyDark font-sans text-lg">
                        {userInfo.phone}
                      </p>
                    </div>
                    <div className="absolute top-1 right-1 ">
                      <EditAccountButton
                        name={userInfo.name}
                        email={userInfo.email}
                        phone={userInfo.phone}
                        edit={edit}
                        onEdit={(newName, newEmail, newPhone) => {
                          updateUserInfo({
                            email: newEmail,
                          });
                          updateUserInfo({
                            name: newName,
                          });
                          updateUserInfo({
                            phone: newPhone,
                          });
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="absolute top-1 right-1 ">
                      {edit && (
                        <EditClientAccountButton
                          name={userInfo.name}
                          email={userInfo.email}
                          onEdit={(newName, newEmail) => {
                            updateUserInfo({
                              email: newEmail,
                            });
                            updateUserInfo({
                              name: newName,
                            });
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
              </div>
              <Separator />
              {IsExpert ? (
                <div className="flex flex-col space-y-6 bg-bg rounded-3xl p-6 border-0 border-greyCold relative">
                  <h3 className="text-black font-header text-2xl font-bold">
                    Location
                  </h3>
                  {/* <Location
                        wilaya={userInfo.wilaya}
                        city={userInfo.city}
                        size="md"
                      /> */}

                  <div className="flex flex-col space-y-2">
                    <h4 className="text-black font-header text-xl font-semibold">
                      Wilaya
                    </h4>
                    <p className="text-greyDark font-sans text-lg">
                      {userInfo.wilaya}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-black font-header text-xl font-semibold">
                      City
                    </h4>
                    <p className="text-greyDark font-sans text-lg">
                      {userInfo.city}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-black font-header text-xl font-semibold">
                      Address
                    </h4>
                    <p className="text-greyDark font-sans text-lg">
                      {userInfo.streetAdress}
                    </p>
                  </div>
                  {/* <div className="flex flex-col space-y-2">
                      <h4 className="text-black font-header text-xl font-semibold">
                        Phone
                      </h4>
                      <p className="text-greyDark font-sans text-lg">
                        {userInfo.phone}
                      </p>
                    </div> */}
                  <div className="absolute top-1 right-1 ">
                    <EditLocationButton
                      streetAdress={userInfo.streetAdress}
                      wilaya={userInfo.wilaya}
                      city={userInfo.city}
                      onEdit={(newStreetAdress, newWilaya, newCity) => {
                        updateUserInfo({
                          streetAdress: newStreetAdress,
                        });
                        updateUserInfo({
                          wilaya: newWilaya,
                        });
                        updateUserInfo({
                          city: newCity,
                        });
                      }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-6 bg-bg rounded-3xl p-6 border-0 border-greyCold relative">
                  <h3 className="text-black font-header text-2xl font-bold">
                    Location
                  </h3>
                  {/* <Location
                        wilaya={userInfo.wilaya}
                        city={userInfo.city}
                        size="md"
                      /> */}

                  <div className="flex flex-col space-y-2">
                    <h4 className="text-black font-header text-xl font-semibold">
                      Wilaya
                    </h4>
                    <p className="text-greyDark font-sans text-lg">
                      {userInfo.wilaya}
                    </p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <h4 className="text-black font-header text-xl font-semibold">
                      City
                    </h4>
                    <p className="text-greyDark font-sans text-lg">
                      {userInfo.city}
                    </p>
                  </div>

                  {/* <div className="flex flex-col space-y-2">
                      <h4 className="text-black font-header text-xl font-semibold">
                        Phone
                      </h4>
                      <p className="text-greyDark font-sans text-lg">
                        {userInfo.phone}
                      </p>
                    </div> */}
                  <div className="absolute top-1 right-1 ">
                    <EditClientLocationButton
                      wilaya={userInfo.wilaya}
                      city={userInfo.city}
                      onEdit={(newWilaya, newCity) => {
                        updateUserInfo({
                          wilaya: newWilaya,
                        });
                        updateUserInfo({
                          city: newCity,
                        });
                      }}
                    />
                  </div>
                </div>
              )}
              {/* TODO: handle close account fi onDelete  */}
              <div className="flex items-end justify-end">
                <CloseAccount onDelete={closeAccount} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="PasswordAndSecurity">
            <div className="flex flex-col space-y-3 min-h-[589px]">
              <div className="pl-2 pb-2">
                <h2 className="text-black font-header text-3xl font-bold">
                  Password And Security
                </h2>
              </div>
              <div className="flex flex-col space-y-6 bg-bg rounded-3xl p-6 border-0 border-greyCold relative">
                <h3 className="text-black font-header text-2xl font-bold">
                  Password {userInfo.password}
                </h3>
                <div className="absolute top-1 right-1 ">
                  {edit && (
                    <EditPasswordButton
                      password={userInfo.password}
                      onEdit={(newPassword) => {
                        updateUserInfo({
                          password: newPassword,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </PageContainer>
      <Footer />
    </>
  );
}
