import { useState, useRef, useEffect } from "react";
import GeoworkItem from "@/components/profile/GeoworkItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function GeoworkHistory({ profileInfo, updateProfileInfo }) {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null); // Reference to the container

  // Adjust height dynamically
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
    }
  }, [showAll]);

  const toggleShowAll = () => {
    if (showAll) {
      // Transition to collapsed state
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      setTimeout(() => {
        containerRef.current.style.height = `${containerRef.current.firstElementChild.scrollHeight}px`;
      }, 10);
    } else {
      // Transition to expanded state
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      setTimeout(() => {
        containerRef.current.style.height = 'auto';
      }, 500); // duration should match the CSS transition time
    }
    setShowAll(!showAll);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 bg-white">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-header font-semibold mb-1">Geowork History</h3>

          <div ref={containerRef} className="transition-height duration-500 ease-in-out overflow-hidden">
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
          </div>

          <Button onClick={toggleShowAll} variant="link" size="lg">
            {showAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      </div>
    </>
  );
}
