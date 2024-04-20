// CollapsibleContainer.js
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import React from "react";
const CollapsibleContainer = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    toggleExpansion();
  }, []);

  useEffect(() => {
    const adjustHeight = () => {
      if (containerRef.current) {
        if (isExpanded) {
          containerRef.current.style.height = "auto";
        } else {
          containerRef.current.style.height = `${containerRef.current.firstElementChild.scrollHeight}px`;
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      adjustHeight(); // Initial adjustment

      const resizeObserver = new ResizeObserver(() => {
        adjustHeight(); // Adjust whenever the container's first element changes size
      });

      // Observe the first child, as it is the one that changes size
      if (container.firstElementChild) {
        resizeObserver.observe(container.firstElementChild);
      }

      return () => {
        if (container.firstElementChild) {
          resizeObserver.unobserve(container.firstElementChild);
        }
      };
    }
  }, [isExpanded]); // Re-run this effect when 'isExpanded' changes

  const toggleExpansion = () => {
    if (isExpanded) {
      // Transition to collapsed state
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      setTimeout(() => {
        containerRef.current.style.height = `${containerRef.current.firstElementChild.scrollHeight}px`;
        setIsExpanded(!isExpanded);
      }, 10);
    } else {
      // Transition to expanded state
      containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
      setTimeout(() => {
        containerRef.current.style.height = "auto";
        setIsExpanded(!isExpanded);
      }, 500); // duration should match the CSS transition time
    }
  };

  const itemCount = React.Children.count(children);
  return (
    <>
      <div
        ref={containerRef}
        className="transition-height duration-500 ease-in-out overflow-hidden"
      >
        {children}
      </div>
      {itemCount > 1 && (
        <Button onClick={toggleExpansion} variant="link" size="lg">
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      )}
    </>
  );
};

export default CollapsibleContainer;
