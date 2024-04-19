import { useState, useRef, useEffect } from "react";
import GeoworkItem from "@/components/profile/GeoworkItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
export default function GeoworkHistory({ profileInfo, updateProfileInfo }) {
  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-header font-semibold mb-1">
            Geowork History
          </h3>
          <CollapsibleContainer>
            {profileInfo.jobs.map((job, index) => (
              <div key={index} className="mb-4">
                <GeoworkItem
                  job={job}
                  onEdit={(newJob) => editGeowork(index, newJob)}
                  onDelete={() => deleteGeowork(index)}
                  index={index}
                />
                <Separator />
              </div>
            ))}
          </CollapsibleContainer>
        </div>
      </div>
    </>
  );
}
