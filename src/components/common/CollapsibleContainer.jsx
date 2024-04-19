// CollapsibleContainer.js
import { useState,useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const CollapsibleContainer = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.height = `${containerRef.current.firstElementChild.scrollHeight}px`;
    }
  }, []);

  const toggleExpansion = () => {
    const currentHeight = containerRef.current.style.height;
    if (isExpanded) {
      // Transition to collapsed state
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      setTimeout(() => {
        containerRef.current.style.height = `${containerRef.current.firstElementChild.scrollHeight}px`;
      }, 10);
    } else {
      // Transition to expanded state
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      setTimeout(() => {
        containerRef.current.style.height = "auto";
      }, 500); // duration should match the CSS transition time
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        ref={containerRef}
        className="transition-height duration-500 ease-in-out overflow-hidden"
      >
        {children}
      </div>
      <Button onClick={toggleExpansion} variant="link" size="lg">
        {isExpanded ? "Show Less" : "Show More"}
      </Button>
    </>
  );
};

export default CollapsibleContainer;
