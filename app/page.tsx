"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

// Dynamically import the TripGenius component with ssr: false to prevent server-side rendering
const TripGenius = dynamic(() => import("@/components/tripgenius"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <p>Loading trip planner...</p>
    </div>
  ),
});

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <TripGenius />
    </Suspense>
  );
}
