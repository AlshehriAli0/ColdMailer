import SectionBreak from "@/components/section-break";
import dynamic from "next/dynamic";
import Intro from "@/components/intro";

const InfoCard = dynamic(() => import("@/components/info-card"));



export default function HomePage() {
  return (
    <main className="scroll-mt-96">
      <Intro></Intro>
      <span className=" flex h-36 2xl:h-72 items-center justify-center sm:h-36">
        <SectionBreak></SectionBreak>
      </span>
      <h3 className="text-violet-300/80 text-center tracking-tight text-3xl sm:text-5xl mt-12 -mb-12 ">About Cold Mailer</h3>
      <InfoCard/>
    </main>
  );
}
