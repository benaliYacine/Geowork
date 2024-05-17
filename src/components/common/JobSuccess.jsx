import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Crown } from "lucide-react";
const JobSuccess = ({ percentage = 65 }) => {
  return (
    <div className="flex gap-2 items-center mt-2">
      <div className="h-10 w-10 relative">
        <CircularProgressbar
          value={percentage}
          text={""}
          styles={{
            // Customize the root svg element
            root: {},
            // Customize the path, i.e. the "completed progress"
            path: {
              // Path color
              stroke: `#ff5400`,
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "round",
              // Customize transition animation
              transition: "stroke-dashoffset 0.5s ease 0s",
              // Rotate the path
              transform: "rotate(0turn)",
              transformOrigin: "center center",
            },
            // Customize the circle behind the path, i.e. the "total progress"
            trail: {
              // Trail color
              stroke: "#ffeedd",
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: "round",
              // Rotate the trail
              transform: "rotate(0turn)",
              transformOrigin: "center center",
            },
            // Customize the text
            text: {
              // Text color
              fill: "#ff5400",
              // Text size
              fontSize: "32px",
            },
            // Customize background - only used when the `background` prop is true
            background: {
              fill: "#000000",
            },
          }}
        />{" "}
        <p className=" text-primary absolute top-2 left-2">
          <Crown />
        </p>
      </div>
      <p className="text-xl text-primary"> {percentage}% Job Success</p>
    </div>
  );
};
export default JobSuccess;
