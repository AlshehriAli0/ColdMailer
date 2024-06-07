import Sidebar from "@/components/sidebar";
import React from "react";
import { Suspense } from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </main>
  );
}

export default layout;
