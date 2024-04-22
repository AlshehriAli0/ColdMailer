import React from "react";

import { saveUser } from "@/server/actions";

export default function ToolPage() {
  void saveUser();

  return (
    <section className="text-white">
      <div className="flex h-screen w-full items-center justify-center">
        <h1 className="text-5xl">hi444444444</h1>
      </div>
    </section>
  );
}
