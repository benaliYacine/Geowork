import React from 'react';
import {cn} from "@/lib/utils"
export default function PageContainer({ children, className }) {
  return (
    <div className={(cn("w-full flex justify-center items-center"), className)}>
      <div className="flex-1 m-6 sm:mx-12 md:mx-18 lg:mx-28 xl:mx-32 max-w-[1440px]">
        {children}
      </div>
    </div>
  );
}
