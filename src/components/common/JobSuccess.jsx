import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Crown } from "lucide-react";
const JobSuccess = ({ percentage = 65, size = "md" }) => {
  const sizeMapping = {
    xs: 8,
    sm: 12, // Assuming 16 pixels for small
    md: 18, // Assuming 24 pixels for medium
    lg: 24, // Assuming 32 pixels for large
    xl: 32, // Assuming 40 pixels for extra large
  };



  const iconSize = sizeMapping[size] || 24;
  const barSize = sizeMapping[size] / 2 || 10;

  return (
    <div className="flex gap-2 items-center">
      <div className={`h-${barSize} w-${barSize} relative`}>
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
        <div className="absolute flex top-0 right-0 bottom-0 left-0 justify-center items-center">
          <p className=" text-primary">
            <Crown size={iconSize} />
          </p>
        </div>
      </div>
      <p className={`text-${size} text-primary`}> {percentage}% Job Success</p>
    </div>
  );
};
export default JobSuccess;
