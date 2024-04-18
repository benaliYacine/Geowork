import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/side-tabs";
import { React, useState } from "react";

import EditTitleButton from "@/components/jobPostEdit/EditTitleButton";
import EditBudgetButton from "@/components/jobPostEdit/EditBudgetButton";
import EditCategoryButton from "@/components/jobPostEdit/EditCategoryButton";
import EditDescriptionButton from "@/components/jobPostEdit/EditDescriptionButton";
import EditImageButton from "@/components/jobPostEdit/EditImageButton";
import EditLocationButton from "@/components/settingsEdit/EditLocationButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Pencil, Save, LayoutGrid } from "lucide-react";

import DeleteJobPost from "@/components/jobPost/DeleteJobPost";
import ImagesCarousel from "@/components/jobPost/ImagesCarousel";
import RatingDisplay from "@/components/expertList/RatingDisplay";
import Location from "@/components/common/Location";
import ExpertItem from "@/components/expertList/ExpertItem";
import ExpertList from "@/components/expertList/ExpertList";
import CloseAccount from "@/components/settings/CloseAccount";
import EditAccountButton from "@/components/settingsEdit/EditAccountButton";
import EditPasswordButton from "@/components/settingsEdit/EditPasswordButton";
import EditClientLocationButton from "@/components/settingsEdit/EditClientLocationButton";
import EditClientAccountButton from "@/components/settingsEdit/EditClientAccountButton";

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

  const IsExpert = false;

  // Function to update user information
  const updateUserInfo = (newInfo) => {
    setUserInfo((prevInfo) => ({ ...prevInfo, ...newInfo }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full">
        <div className="flex flex-col m-6 sm:mx-12 md:mx-18 lg:mx-40 xl:mx-52 max-w-[1440px] ">
          <div className="flex flex-col">
            <div className="flex items-center justify-between ">
              <h1 className="text-black font-header text-4xl font-bold">
                Settings
              </h1>
            </div>
            <Tabs defaultValue="MyInfo" className="mt-4">
              <TabsList className="">
                <TabsTrigger value="MyInfo">My Info</TabsTrigger>
                <TabsTrigger value="PasswordAndSecurity">
                  Password And Security
                </TabsTrigger>
              </TabsList>
              <TabsContent value="MyInfo">
                {/* Your existing JSX here, wrap it in a div if needed */}
                <div className="flex flex-col space-y-0">
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
                    <CloseAccount onDelete={() => {}} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="PasswordAndSecurity">
                <div className="flex flex-col space-y-3">
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
                      <EditPasswordButton
                        password={userInfo.password}
                        onEdit={(newPassword) => {
                          updateUserInfo({
                            password: newPassword,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
