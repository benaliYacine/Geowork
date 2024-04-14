import React, { useState } from "react";
import  ExpertItem  from "@/components/jobPost/ExpertItem";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const experts = Array.from({ length: 50 }, (_, i) => ({
  name: `John Doe ${i + 1}`,
  role: "Web Developer",
  rating: Math.random() * 5,
  avatarUrl: "https://github.com/johndoe.png",
  initials: "JD",
  wilaya: "Algiers",
  city: "Central",
}));

const ITEMS_PER_PAGE = 10;

export default function ExpertList() {
  const [currentPage, setCurrentPage] = useState(1);

  const lastPageIndex = Math.ceil(experts.length / ITEMS_PER_PAGE);
  const currentData = experts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, lastPageIndex));
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        {currentData.map((expert, index) => (
          <ExpertItem keys={index} expert={expert} />
        ))}
      </div>
      <Pagination className=" flex justify-end ">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handlePrevious} disabled={currentPage === 1} />
          </PaginationItem>
          {[...Array(lastPageIndex).keys()].map((page) => (
            <PaginationItem key={page}>
              <PaginationLink onClick={() => setCurrentPage(page + 1)} isActive={currentPage === page + 1}>
                {page + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext onClick={handleNext} disabled={currentPage === lastPageIndex} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
