import SignUpForm from "@/components/sign-up";
import React from "react";

export const dynamic = "force-static";

export default function SignUpPage() {
  return (
    <section className="mt-[4rem] flex h-screen w-full scroll-mt-96 justify-center sm:mt-[5rem] 2xl:mt-[9rem]">
      <SignUpForm></SignUpForm>
    </section>
  );
}
