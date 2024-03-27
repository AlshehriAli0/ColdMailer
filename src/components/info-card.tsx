import React from "react";
import dynamic from "next/dynamic";
import { GiIceCube } from "react-icons/gi";
import Link from "next/link";
import { MdMarkEmailRead } from "react-icons/md";

const Meteors = dynamic(() => import("@/ui/meteors"));

export default function InfoCard() {
  return (
    <div id="learnMore" className=" my-24 flex justify-center">
      <div className=" relative h-[42rem] w-full max-w-[85%] sm:h-[30rem] md:h-[24rem] xl:h-[19rem]">
        <div className="w-100 absolute inset-0 h-full transform rounded-full bg-red-500 bg-gradient-to-r from-violet-500 to-purple-500 opacity-65 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-slate-950/85 px-4 py-8 shadow-xl">
          <h1 className="absolute left-8 top-14 z-50 mx-2 flex text-xl font-medium tracking-tight text-violet-400 sm:left-12 sm:text-2xl">
            <span className="!mr-3">The Easiest Way to Reach Out? </span>
            <span className="flex items-center font-semibold">
              Cold Mailer
              <GiIceCube className="ml-2 items-center" />
            </span>
          </h1>

          <p className="absolute left-12 top-28 z-50 mb-4 mt-6 w-[73%] text-justify text-base font-normal text-slate-600 sm:left-16 sm:mt-0 sm:w-[80%] lg:w-[90%]">
            <span className="ml font-semibold">Cold Mailer</span> is your go-to
            solution for effortlessly sending personalized emails to multiple
            recipients. Craft your message once, and Cold Mailer will take care
            of the rest, ensuring each recipient receives a tailored email
            without the hassle of manual input.
            <br />
            Whether you&apos;re seeking employment opportunities, networking
            with professionals, or reaching out to potential collaborators, Cold
            Mailer streamlines the process and help tracks the mails with a
            custom status for each email recipient, allowing you to focus on
            what matters most: building connections.
          </p>

          <Link href={"/tool"} className="left flex items-center absolute left-8 rounded-lg border border-violet-500 hover:border-2 px-8 py-3 text-violet-300 transition-all hover:scale-105 hover:bg-violet-900/10 active:scale-100 sm:left-12 md:py-2 ">
            Start Mailing
            <MdMarkEmailRead className="ml-2 text-xl" />
          </Link>

          <Meteors />
        </div>
      </div>
    </div>
  );
}
