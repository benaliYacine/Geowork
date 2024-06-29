import React, { useRef, useEffect } from "react";
import Help from "@/components/Job/Help";
import { BadgeHelp } from "lucide-react";
const JobActivity = ({ activity }) => {
  function categorizeNumber(num) {
    if (num < 5) {
      return "less than 5";
    } else if (num >= 5 && num <= 10) {
      return "5 to 10";
    } else if (num > 10 && num <= 25) {
      return "10 to 25";
    } else if (num > 25 && num <= 50) {
      return "25 to 50";
    } else {
      return "+50";
    }
  }

  // Helper function to format the "last seen" message
  function formatLastSeen(lastSeen) {
    if (!lastSeen) return " Now";

    const now = new Date();
    const lastSeenDate = new Date(lastSeen);
    const minutesAgo = Math.round((now - lastSeenDate) / (1000 * 60));

    if (minutesAgo < 1) return " Now";
    if (minutesAgo < 60) return ` ${minutesAgo} minutes ago`;
    if (minutesAgo < 1440) return ` ${Math.round(minutesAgo / 60)} hours ago`;

    return ` on ${lastSeenDate.toLocaleDateString()}`;
  }

  return (
    <div className=" flex flex-col gap-2">
      <h4 className=" text-xl font-medium text-black ">Activity on this job</h4>
      <p className="text-sm font-medium text-black">
        Proposals:{" "}
        <Help context="This range includes relevant proposals, but does not include proposals that are withdrawn, declined, or archived. Please note that all proposals are accessible to clients on their applicants page.">
          <BadgeHelp className="w-5 h-5 text-primary inline mx-1 cursor-pointer" />
        </Help>
        {categorizeNumber(activity.proposalsNumber)}
      </p>
      {/* <p className="text-sm font-medium text-black">
        Last viewed by client:
        <Help context="This is when the client last reviewed or interacted with the applicants for this job.">
          {" "}
          <BadgeHelp className="w-5 h-5 text-primary inline mx-1 cursor-pointer" />
        </Help>
        {formatLastSeen(activity.lastViewed)}
      </p> */}
      {/* <p className="text-sm font-medium text-black">
        Interviewing: {activity.interviewingNumber}
      </p> */}
      <p className="text-sm font-medium text-black">
        Invites sent: {activity.invitesNumber}
      </p>
      {/* <p className="text-sm font-medium text-black">
        Hired: {activity.hiredNumber}
      </p> */}
    </div>
  );
};

export default JobActivity;
