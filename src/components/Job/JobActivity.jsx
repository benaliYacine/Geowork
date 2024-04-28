import React, { useRef, useEffect } from "react";
import Help from "@/components/Job/Help";
import { BadgeHelp } from "lucide-react";
const JobActivity = ({}) => {
  return (
    <div className=" flex flex-col gap-2">
      <h4 className=" text-xl font-medium text-black ">Activity on this job</h4>
      <p className="text-sm font-medium text-black">
        Proposals:{" "}
        <Help context="This range includes relevant proposals, but does not include proposals that are withdrawn, declined, or archived. Please note that all proposals are accessible to clients on their applicants page." />
        5 to 10
      </p>
      <p className="text-sm font-medium text-black">
        Last viewed by client:
        <Help context="This is when the client last reviewed or interacted with the applicants for this job." />
        2 hours ago
      </p>
      <p className="text-sm font-medium text-black">Interviewing: 1</p>
      <p className="text-sm font-medium text-black">Invites sent: 0</p>
      <p className="text-sm font-medium text-black">Hired: 0</p>
    </div>
  );
};

export default JobActivity;
