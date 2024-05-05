import { useState, createContext } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Location from "@/components/common/Location";
import EmploymentHistory from "@/components/profile/EmploymentHistory";
import ExperienceHistory from "@/components/profile/ExperienceHistory";
import EducationHistory from "@/components/profile/EducationHistory";
import GeoworkHistory from "@/components/profile/GeoworkHistory";
import { Button } from "@/components/ui/button";
import CollapsibleTextContainer from "@/components/common/CollapsibleTextContainer";
import { getInitials } from "@/lib/utils";
import axios from "axios";
import { EditContext } from "@/components/profile/Profile";

export default function Proposal({
  name = "benali yacine",
  wilaya = "wilaya",
  city = "city",
  profileInfo,
  photoProfileSrc = undefined,
  updateProfileInfo,
  edit = false,
  coverLetter,
  budget,
}) {
  return (
    <EditContext.Provider value={{ edit }}>
      <div className="flex flex-col gap-4 bg-bg p-2">
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
                  alt={name}
                />
                <AvatarFallback className=" text-4xl">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex flex-col">
              <h2 className="text-6xl font-header font-semibold mb-1">
                {name}
              </h2>
              <Location wilaya={wilaya} city={city} size="lg" />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-4xl font-header font-semibold mb-1">
                Proposal Details
              </h3>
              <p className="text-2xl text-primary font-semibold ">
                {budget}
              </p>
            </div>
            <p className="">{coverLetter}</p>
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
          <div className="flex flex-col gap-4">
            <h3 className="text-4xl font-header font-semibold mb-1">
              {profileInfo.roleTitle}
            </h3>

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
