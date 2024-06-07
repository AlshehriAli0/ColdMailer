import Sidebar from "@/components/sidebar";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Sidebar />
      {children}
    </main>
  );
}

export default layout;
