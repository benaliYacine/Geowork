import React from 'react';

export default function PageContainer({ children }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="flex-1 mx-6 sm:mx-12 md:mx-18 lg:mx-28 xl:mx-32 max-w-[1440px]">
        {children}
      </div>
    </div>
  );
}
