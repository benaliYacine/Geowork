import React, { useState, useEffect } from "react";
import JobItem from "@/components/jobListAllJobPost/JobItem";
import {
    Pagination,
    PaginationEllipsis,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export default function JobList({ jobs = [], closed }) {
    console.log("jobs", jobs);
    const [currentPage, setCurrentPage] = useState(1);

    // Filter jobs based on the closed prop
    const filteredJobs = jobs.filter((job) => job.closed === closed);

    const lastPageIndex = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
    const currentData = filteredJobs.slice(
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
                pages = [
                    "...",
                    currentPage - 1,
                    currentPage,
                    currentPage + 1,
                    "...",
                ];
            }
        }

        return pages;
    };

    useEffect(() => {
        setCurrentPage(1); // Reset to first page if closed prop changes
    }, [closed]);

    return (
        <div className="w-full">
            <div className="flex flex-col items-center w-full">
                {filteredJobs.length === 0 ? (
                    <div className="p-4 h-[500px] w-full flex items-center justify-center text-xl text-slate-300 font-semibold">
                        there are no items here!
                    </div>
                ) : (
                    <div className="min-h-[500px] w-full">
                        {currentData.map((job, index) => (
                            <JobItem key={index} job={job} />
                        ))}
                    </div>
                )}
            </div>
            <Pagination className="flex justify-end">
                <PaginationContent>
                    <PaginationItem>
                        {filteredJobs.length !== 0 && (
                            <PaginationPrevious
                                onClick={handlePrevious}
                                disabled={currentPage === 1}
                            />
                        )}
                    </PaginationItem>
                    {calculatePageRange(currentPage, lastPageIndex).map(
                        (page, index) =>
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
                        {filteredJobs.length !== 0 && (
                            <PaginationNext
                                onClick={handleNext}
                                disabled={currentPage === lastPageIndex}
                            />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
