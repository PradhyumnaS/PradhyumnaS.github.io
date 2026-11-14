import Masthead from "@/components/sections/Masthead";
import Contents from "@/components/sections/Contents";
import Prologue from "@/components/sections/Prologue";
import Work from "@/components/sections/Work";
import Practice from "@/components/sections/Practice";
import Research from "@/components/sections/Research";
import Toolkit from "@/components/sections/Toolkit";
import Correspondence from "@/components/sections/Correspondence";

export default function Home() {
  return (
    <main>
      <Masthead />
      <Contents />
      <Prologue />
      <Work />
      <Practice />
      <Research />
      <Toolkit />
      <Correspondence />
    </main>
  );
}
