import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Location from "@/components/common/Location";
import EmploymentHistory from "@/components/profile/EmploymentHistory";
import ExperienceHistory from "@/components/profile/ExperienceHistory";
import EducationHistory from "@/components/profile/EducationHistory";
import GeoworkHistory from "@/components/profile/GeoworkHistory";
import EditAvatarCard from "@/components/profile/EditAvatarCard";
import { Button } from "@/components/ui/button";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import {getInitials } from "@/lib/utils"
import axios from 'axios';
export default function Profile({
  name = "benali yacine",
  wilaya = "wilaya",
  city = "city",
  profileInfo,
  updateProfileInfo,
  edit = false,
}) {
  const addImage = async (newImage) => {
    const dataUrl = newImage;
    const blobData = await fetch(dataUrl).then((res) => res.blob());
    const formData = new FormData();
    formData.append("image", blobData);
    const response= await axios.patch('/api/professionnels/changePhotoDeProfile',formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    console.log(response.data);
    updateProfileInfo({
      photoProfile: response.data.profile.photoProfile // Directly assign the newImage Src
    });
    // setIsPhotoAdded(true);
    // setShowPhotoError(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-row p-0 w-full mr-auto items-center">
          <div className=" relative">
            <Avatar className="mr-4" size={24}>
              <AvatarImage src={profileInfo.photoProfile.url} alt={name} />
              <AvatarFallback className=" text-4xl">
                {getInitials(name)}
              </AvatarFallback>
            </Avatar>
            {edit && (
              <div className="absolute bottom-[-6px] right-4 ">
                <EditAvatarCard
                  addImage={addImage}
                  existingPhoto={profileInfo.photoProfile}
                  variant="outlined"
                  className="flex-2"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h2 className="text-6xl font-header font-semibold mb-1">{name}</h2>
            <Location wilaya={wilaya} city={city} size="lg" />
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
        edit={edit}
      />
      <EmploymentHistory
        profileInfo={profileInfo}
        updateProfileInfo={updateProfileInfo}
        edit={edit}
      />
      <ExperienceHistory
        profileInfo={profileInfo}
        updateProfileInfo={updateProfileInfo}
        edit={edit}
      />
      <EducationHistory
        profileInfo={profileInfo}
        updateProfileInfo={updateProfileInfo}
        edit={edit}
      />
    </div>
  );
}
