// CollapsibleTextContainer.js
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

const CollapsibleTextContainer = ({ children, collapsedHeight = "0px" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const textContainerRef = useRef(null);
  const [showToggle, setShowToggle] = useState(true);

  useEffect(() => {
      const adjustHeight = () => {
          if (
              textContainerRef.current.scrollHeight <=
              parseInt(collapsedHeight, 10)
          ) {
              // If content is less than or equal to collapsed height, don't show toggle
              setShowToggle(false);
              textContainerRef.current.style.height = "auto";
          } else {
              // Else, set to collapsed height and show toggle
              textContainerRef.current.style.height = collapsedHeight;
              setShowToggle(true);
          }
      };

      adjustHeight();
      // Listen for window resize to adjust toggle visibility based on new height
      window.addEventListener("resize", adjustHeight);

      return () => {
          window.removeEventListener("resize", adjustHeight);
      };
  }, [collapsedHeight, children]);

  const toggleExpansion = () => {
    if (isExpanded) {
      // Transition to collapsed state
      textContainerRef.current.style.height = collapsedHeight;
    } else {
      // Transition to expanded state
      textContainerRef.current.style.height = `${textContainerRef.current.scrollHeight}px`;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        ref={textContainerRef}
        className="transition-height duration-500 ease-in-out overflow-hidden"
      >
        {children}
      </div>
      {showToggle && (
        <Button
          onClick={toggleExpansion}
          variant="link"
          size="none"
          className="mr-auto"
        >
          {isExpanded ? "Less" : "More"}
        </Button>
      )}
    </>
  );
};

export default CollapsibleTextContainer;
