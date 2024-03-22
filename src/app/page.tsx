"use client";

import Intro from "@/components/intro";
import { redirect } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useUser();

  if (isSignedIn) {
    redirect("/tool");
  }
  
  return (
    <main>
      <Intro></Intro>
    </main>
  );
}
