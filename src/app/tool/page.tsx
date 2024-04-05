import React from "react";

import { saveUser } from "@/server/actions";
import Test from "@/components/test";

export default function ToolPage() {
  void saveUser();

  return (
    <section className="text-white">
      <div className="flex h-screen w-screen items-center justify-center">
        <Test />
        <h1 className="text-5xl">hi444444444</h1>
      </div>
    </section>
  );
}
