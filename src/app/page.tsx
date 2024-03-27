import SectionBreak from "@/components/section-break";
import dynamic from "next/dynamic";
import Intro from "@/components/intro";

const InfoCard = dynamic(() => import("@/components/info-card"));



export default function HomePage() {
  return (
    <main className="scroll-mt-96">
      <Intro></Intro>
      <span className=" flex h-20 2xl:h-72 items-center justify-center sm:h-32">
        <SectionBreak></SectionBreak>
      </span>
      <InfoCard/>
    </main>
  );
}
