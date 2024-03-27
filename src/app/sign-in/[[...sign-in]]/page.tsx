import SignInForm from "@/components/sign-in";
import React from "react";

export default function SignInPage() {
  return (
    <section className="mt-[4rem] flex h-screen scroll-mt-96 justify-center sm:mt-[5rem] sm:w-screen 2xl:mt-[8rem]">
      <SignInForm></SignInForm>
    </section>
  );
}
