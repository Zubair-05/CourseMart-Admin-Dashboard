import React from "react";
import Skeleton from "@mui/material/Skeleton";

function SavedCoursesSkeleton() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-grow p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <div className="flex flex-col">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="border border-gray-300 rounded p-4 mb-4">
              <div className="flex sm:justify-between flex-col sm:flex-row">
                <div>
                  <Skeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width={80} height={20} sx={{ mb: 2 }} />
                </div>
                <div className="flex justify-center sm:justify-end mb-3 md:mt-0">
                  <Skeleton variant="rectangular" width={150} height={100} />
                </div>
              </div>
              <div className="flex justify-start">
                <Skeleton variant="rectangular" width={80} height={36} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width={80} height={36} sx={{ mr: 2 }} />
                <Skeleton variant="rectangular" width={80} height={36} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SavedCoursesSkeleton;
