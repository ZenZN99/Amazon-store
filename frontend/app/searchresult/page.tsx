"use client";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center py-10">Loading...</p>}>
      <SearchResults />
    </Suspense>
  );
}
