import SignInForm from "@/components/sign-in";
import React from "react";

export default function SignInPage() {
  return (
    <section className="mt-[4rem] flex h-screen scroll-mt-96 justify-center sm:mt-[6rem] sm:w-full 2xl:mt-[9rem]">
      <SignInForm></SignInForm>
    </section>
  );
}
