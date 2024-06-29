// Define the IconButton component
import { cn } from "@/lib/utils";
import React from "react";
const IconButton = React.forwardRef(
  ({ variant = "primary", className, children, ...props }, ref) => {
    // Define base and variant-specific styles
    const baseStyles =
      "flex h-fit w-fit items-center justify-center text-center overflow-hidden p-2 rounded-full transition ease-in-out duration-300 active:scale-100 hover:scale-105";
    const variantStyles = {
      sprimary: "bg-primary text-primary-foreground p-[3px]",
      primary: "bg-primary text-primary-foreground",
      outlined: "bg-background text-primary border-2 border-primary",
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
