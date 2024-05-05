import { useState, createContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Location from "@/components/common/Location";
import EmploymentHistory from "@/components/profile/EmploymentHistory";
import ExperienceHistory from "@/components/profile/ExperienceHistory";
import EducationHistory from "@/components/profile/EducationHistory";
import GeoworkHistory from "@/components/profile/GeoworkHistory";
import EditAvatarCard from "@/components/profile/EditAvatarCard";
import { Button } from "@/components/ui/button";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import { getInitials } from "@/lib/utils";
import axios from "axios";
import SendInvitation from "@/components/expertList/SendInvitation";

export const EditContext = createContext();

export default function Profile({
  expert,
  profileInfo,
  photoProfileSrc = undefined,
  updateProfileInfo,
  edit = false,
  action = false,
}) {
  // const addImage = (newImage) => {
  //   updateProfileInfo({
  //     photoProfile: newImage, // Directly assign the newImage Src
  //   });
  // };
  const addImage = async (newImage) => {
    // mawch yemchi ki tbedel el image ma tetbedelch fel preview
    const dataUrl = newImage;
    const blobData = await fetch(dataUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blobData);
    const response = await axios.patch(
      "/api/professionnels/changePhotoDeProfile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    updateProfileInfo({
      photoProfile: response.data.profile.photoProfile, // Directly assign the newImage Src
    });
    // setIsPhotoAdded(true);
    // setShowPhotoError(false);
  };

  return (
    <EditContext.Provider value={{ edit }}>
      <div className="flex flex-col gap-4">
        <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
          <div className="flex flex-row p-0 w-full mr-auto items-center">
            <div className=" relative">
              <Avatar className="mr-4" size={24}>
                <AvatarImage
                  src={
                    profileInfo.photoProfile.url
                      ? profileInfo.photoProfile.url
                      : profileInfo.photoProfile
                  }
                  alt={expert.name}
                />
                <AvatarFallback className=" text-4xl">
                  {getInitials(expert.name)}
                </AvatarFallback>
              </Avatar>
              {edit && (
                <div className="absolute bottom-[-6px] right-4 ">
                  <EditAvatarCard
                    addImage={addImage}
                    existingPhoto={profileInfo.photoProfile}
                    existingPhotoSrc={photoProfileSrc}
                    variant="outlined"
                    className="flex-2"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col w-full">
              <div className="flex w-full justify-between">
                <h2 className="text-6xl font-header font-semibold mb-1">
                  {expert.name}
                </h2>
                {action && (
                  <div className="flex gap-4 items-center">
                    <SendInvitation expert={expert} />
                    {/* <Button>Hire</Button> */}
                  </div>
                )}
              </div>
              <Location wilaya={expert.wilaya} city={expert.city} size="lg" />
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-header font-semibold mb-1">
              {profileInfo.roleTitle}
            </h3>
            {/* TODO: khdem mecanizme el more w el less */}
            <CollapsibleTextContainer collapsedHeight="50px">
              <p>{profileInfo.Bio}</p>
            </CollapsibleTextContainer>
          </div>
        </div>
        <GeoworkHistory
          profileInfo={profileInfo}
          updateProfileInfo={updateProfileInfo}
        />
        <EmploymentHistory
          profileInfo={profileInfo}
          updateProfileInfo={updateProfileInfo}
        />
        <ExperienceHistory
          profileInfo={profileInfo}
          updateProfileInfo={updateProfileInfo}
        />
        <EducationHistory
          profileInfo={profileInfo}
          updateProfileInfo={updateProfileInfo}
        />
      </div>
    </EditContext.Provider>
  );
}
