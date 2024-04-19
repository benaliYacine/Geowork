import { useState } from "react";
import GeoworkItem from "@/components/profile/GeoworkItem";
// import AddGeoworkButton from "@/components/profile_slides/slideFive/AddGeoworkButton";
import { Separator } from "@/components/ui/separator";

export default function GeoworkHistory({ profileInfo, updateProfileInfo }) {
  const addGeowork = (newGeowork) => {
    updateProfileInfo({
      jobs: [...profileInfo.jobs, newGeowork],
    });
  };

  const deleteGeowork = (indexToDelete) => {
    const filteredGeoworks = profileInfo.jobs.filter(
      (_, index) => index !== indexToDelete
    );
    updateProfileInfo({
      jobs: filteredGeoworks,
    });
  };

  const editGeowork = (indexToEdit, updatedGeowork) => {
    const updatedGeoworks = profileInfo.jobs.map((geowork, index) =>
      index === indexToEdit ? updatedGeowork : geowork
    );
    updateProfileInfo({
      jobs: updatedGeoworks,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <h3 className="text-4xl font-header font-semibold mb-1">
              Geowork history
            </h3>
            {/* <AddGeoworkButton addExperience={addGeowork} /> */}
          </div>
          {profileInfo.jobs.map((job, index) => (
            <>
              <GeoworkItem
                key={index}
                job={job}
                onEdit={(newEdu) => editGeowork(index, newEdu)}
                onDelete={() => deleteGeowork(index)}
                index={index}
              />
              <Separator />
            </>
          ))}
        </div>
      </div>
    </>
  );
}
