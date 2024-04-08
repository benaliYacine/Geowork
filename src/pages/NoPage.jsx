import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import page_not_found from "@/assets/illustrations/page_not_found.svg";

const NoPage = () => {
  return (
    <>
      <main className="flex min-h-full items-center justify-center bg-bg px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          {/* Responsive SVG Image */}
          <img
            src={page_not_found}
            alt="Page Not Found"
            className="mx-auto w-1/2 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
          <h1 className="mt-8 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base leading-7 text-greyDark">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-6">
            <Link to="/" className="rounded-md shadow-sm">
              <Button variant="default" className="text-sm font-semibold">
                Go back home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NoPage;
