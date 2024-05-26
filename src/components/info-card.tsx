import React from "react";
import dynamic from "next/dynamic";
import { GiIceCube } from "react-icons/gi";
import Link from "next/link";
import { MdMarkEmailRead } from "react-icons/md";

const Meteors = dynamic(() => import("@/ui/meteors"));

export default function InfoCard() {
  return (
    <div id="learnMore" className=" my-24 mb-48 flex !scroll-mt-[8rem] justify-center">
      <div className=" relative h-[42.5rem] xl:w-[75%] w-full max-w-[85%] sm:h-[30rem] md:h-[24rem] xl:h-[19rem]">
        <div className="w-100 absolute inset-0 h-full transform rounded-full bg-red-500 bg-gradient-to-r from-violet-500 to-purple-500 opacity-65 blur-3xl" />
        <div className="relative flex h-full flex-col items-start justify-end overflow-hidden rounded-2xl border border-gray-800 bg-slate-950/85 px-4 py-8 shadow-xl">
          <h1 className="absolute left-7 top-14 z-50 mx-2 -mt-4 text-xl font-medium tracking-tight text-violet-400 sm:left-12 sm:flex sm:text-2xl">
            <span className="mr-2">The Easiest Way to Reach Out?</span>
            <span className="flex items-center font-semibold">
              Cold Mailer
              <GiIceCube className="!ml-2 items-center" />
            </span>
          </h1>

          <p className="absolute left-12 top-28 sm:top-24 z-50 mb-4 w-[71%]  text-base font-normal text-slate-500 sm:left-16 sm:mt-0 sm:w-[80%] lg:w-[90%]">
            <span className="text-slate-400 font-semibold">Cold Mailer</span> is your go-to
            solution for effortlessly sending personalized emails to multiple
            recipients. Craft your message once, and Cold Mailer will take care
            of the rest, ensuring each recipient receives a tailored email
            without the hassle of manual input.
            <br className="sm:block hidden" />
            
             Whether you&apos;re seeking employment opportunities, networking
            with professionals, or reaching out to potential collaborators, Cold
            Mailer streamlines the process and help tracks the mails with a
            custom status for each email recipient, allowing you to focus on
            what matters: building connections.
          </p>

          <Link
            href={"/tool"}
            className="left absolute left-8 -mb-3 flex items-center rounded-lg border border-violet-500 px-8 py-3 text-violet-300 transition-all hover:scale-105 hover:border-2 hover:bg-violet-900/10 active:scale-100 sm:left-12 md:py-2 "
          >
            Start Mailing
            <MdMarkEmailRead className="ml-2 text-xl" />
          </Link>

          <Meteors />
        </div>
      </div>
    </div>
  );
}
