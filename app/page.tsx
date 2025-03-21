"use client";

import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/hero";
import RecentProjects from "@/components/RecentProjects";
import Resume from "@/components/Resume";
import Skills from "@/components/Skills";
import { FloatingNav } from "@/components/ui/FloatingNav";
import { navItems } from "@/data";

export default function Home() {
  return (
    <main className='relative bg-black-100 flex justify-center items-center flex-col mx-auto sm:px-10 overflow-clip'>
      <div className="max-w-7xl w-full">
        <FloatingNav navItems={navItems}/>
        <Hero/>
        <Grid/>
        <RecentProjects/>
        <Skills/>
        <Experience/>
        <Resume/>
        <Footer/>
      </div>
    </main>
  );
}
