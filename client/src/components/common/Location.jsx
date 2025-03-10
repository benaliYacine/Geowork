import React from "react";
import { MapPin } from "lucide-react";
const Location = ({ wilaya, city, size = "md" }) => {
  
  const sizeMapping = {
    xs: 16,
    sm: 18, // Assuming 16 pixels for small
    md: 24, // Assuming 24 pixels for medium
    lg: 32, // Assuming 32 pixels for large
    xl: 40, // Assuming 40 pixels for extra large
  };

  const iconSize = sizeMapping[size] || 24;

  return (
    <p className={`text-greyDark text-${size}`}>
      <MapPin size={iconSize} className="inline-block stroke-current stroke-[1.4px]" /> {wilaya}, {city}
    </p>
  );
};

export default Location;
