import React from "react";
import Skeleton from "@mui/material/Skeleton";

function CourseSkeleton() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">
        Knowledge is Power: Empower Others through Course Creation!
      </h1>

      <div className="mx-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="border border-gray-300 rounded p-4">
            <Skeleton variant="text" width={120} height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={180} height={20} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={80} height={20} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ mb: 2 }} />
            <div className="flex justify-center">
              <Skeleton variant="rectangular" width={100} height={36} sx={{ mr: 2 }} />
              <Skeleton variant="rectangular" width={120} height={36} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseSkeleton;
