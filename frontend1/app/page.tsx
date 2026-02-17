
import DemoNavbar from "@/components/DemoNavbar";
import AnimatedFeatureSpotlightDemo from "@/components/DetailsSection";
import DemoOne from "@/components/HomePage";

import TeamSectionDemo from "@/components/TeamSection";
import { FinancialTable } from "@/components/ui/financial-markets-table";
import Image from "next/image";

export default function Home() {
  return (
    <>

  <DemoOne></DemoOne>
  <AnimatedFeatureSpotlightDemo></AnimatedFeatureSpotlightDemo>
  <FinancialTable></FinancialTable>
  <TeamSectionDemo></TeamSectionDemo>
  </>
  );
}
