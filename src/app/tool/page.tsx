import React from "react";

import { saveUser } from "@/server/save-user";
import { verify } from "@/server/verify";

export default async function ToolPage() {
  const { email, name, id } = verify();

  await saveUser({ email, name, id });

  return (
    <section className="text-white">
      
    </section>
  );
}
