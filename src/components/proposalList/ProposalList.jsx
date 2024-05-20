import React, { useState } from "react";
import ProposalItem from "@/components/proposalList/ProposalItem";
import {
  Pagination,
  PaginationEllipsis,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const proposals = Array.from({ length: 1 }, (_, i) => ({
  name: `John Doe`,
  role: "electrician",
  rating: Math.random() * 5,
  avatarUrl:
    "https://ashallendesign.ams3.cdn.digitaloceanspaces.com/rMbsGOyK6i1KjNkbXff8qLohzM1nWQA8HNGwHF0J.png",
  wilaya: "algiers",
  city: "Central",
  budget: "DZD  5, 500",
  coverLetter:
    "Hello! \n\n \t I am writing to express my interest in the Residential Wiring Upgrade project for your three-bedroom apartment in Algiers. With over a decade of experience in the electrical field, I am confident in my ability to deliver high-quality and safe electrical services tailored to your needs. I hold a Bachelor's Degree in Electrical Engineering from USTHB and have completed various certifications in residential electrical systems and electrical safety. My extensive experience includes upgrading wiring, installing circuit breakers, and ensuring all electrical components meet local codes and safety standards. In previous projects, I have successfully improved electrical efficiency and safety for numerous clients. I take pride in my attention to detail and commitment to providing reliable and efficient solutions. I understand the importance of safety and will ensure that your home’s electrical system is upgraded to the highest standards. I am available to start the project at your earliest convenience and will work diligently to complete it within the agreed timeframe. I look forward to the opportunity to discuss your project further and answer any questions you may have. Thank you for considering my proposal. I am excited about the possibility of working with you to enhance the safety and functionality of your home’s electrical system. Best regards",
}));

const ITEMS_PER_PAGE = 10;

export default function ProposalList() {
  const [currentPage, setCurrentPage] = useState(1);

  const lastPageIndex = Math.ceil(proposals.length / ITEMS_PER_PAGE);
  const currentData = proposals.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, lastPageIndex));
  };

  const calculatePageRange = (currentPage, pageCount) => {
    let pages = [];

    if (pageCount <= 4) {
      // If there are 4 or fewer pages, show all page numbers
      pages = Array.from({ length: pageCount }, (_, index) => index + 1);
    } else {
      // More than 4 pages: calculate range
      const startPages = [1, 2];
      const endPages = [pageCount - 1, pageCount];

      if (currentPage <= 3) {
        // Current page is near the start
        pages = [
          ...startPages.slice(0, currentPage - 1),
          currentPage,
          currentPage + 1,
          ...(currentPage < 3 ? [currentPage + 2] : []),
          "...",
        ];
      } else if (currentPage > pageCount - 3) {
        // Current page is near the end
        pages = [
          "...",
          ...(currentPage > pageCount - 2 ? [] : [pageCount - 3]),
          pageCount - 2,
          pageCount - 1,
          pageCount,
        ];
      } else {
        // Current page is somewhere in the middle
        pages = ["...", currentPage - 1, currentPage, currentPage + 1, "..."];
      }
    }

    return pages;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center w-full">
        {proposals.length == 0 ? (
          <div className="p-4 h-[500px] w-full flex items-center justify-center text-xl text-slate-300 font-semibold">
            there is no items here !
          </div>
        ) : (
          <div className="w-full min-h-[500px]">
            {currentData.map((proposal, index) => (
              <ProposalItem key={index} proposal={proposal} />
            ))}
          </div>
        )}
      </div>
      <Pagination className="flex justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {calculatePageRange(currentPage, lastPageIndex).map((page, index) =>
            typeof page === "number" ? (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              disabled={currentPage === lastPageIndex}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
