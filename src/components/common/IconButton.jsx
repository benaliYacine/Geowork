// Define the IconButton component
import { cn } from "@/lib/utils";
import React from "react";
const IconButton = React.forwardRef(
  ({ variant = "primary", className, children, ...props }, ref) => {
    // Define base and variant-specific styles
    const baseStyles =
      "h-fit w-fit items-center justify-center overflow-hidden rounded-full p-1 transition ease-in-out duration-300 active:scale-100 hover:scale-105";
    const variantStyles = {
      primary: "bg-primary text-primary-foreground",
      outlined:
        "bg-background text-primary border border-primary hover:bg-secondaryo hover:text-secondary-foreground",
    };

    // Compute final class names with conditional styling
    const buttonClassNames = cn(
      baseStyles,
      variantStyles[variant] || variantStyles.primary, // Fallback to primary if variant is not recognized
      className // Allow custom class names to be passed
    );

    return (
      <button ref={ref} className={buttonClassNames} {...props}>
        {children} {/* This will render the icon passed as a child */}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
