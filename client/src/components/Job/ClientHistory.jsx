import { useState, useRef, useEffect } from "react";
import ClientHistoryItem from "@/components/Job/ClientHistoryItem";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import CollapsibleContainer from "@/components/common/CollapsibleContainer";
import { v4 as uuid } from "uuid";
export default function GeoworkHistory({ clientHistory }) {
  return (
    <>
      <div className="w-full flex flex-col gap-6 rounded-3xl p-6 border">
        <div className="flex flex-col gap-4">
          <h3 className="text-4xl font-header font-semibold mb-1">
            Client's recent history
          </h3>
          <CollapsibleContainer>
            {clientHistory.length == 0 ? (
              <div className=" text-lg w-full p-3 h-fit text-primary flex justify-center items-center">
                there is no items here
              </div>
            ) : (
              clientHistory.map((job, index) => (
                <div key={uuid()} className="mb-4">
                  <ClientHistoryItem job={job} index={index} />
                  <Separator />
                </div>
              ))
            )}
          </CollapsibleContainer>
        </div>
      </div>
    </>
  );
}
