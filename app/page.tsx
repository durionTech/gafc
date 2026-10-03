import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeartCalling from "@/components/HeartCalling";
import SermonSeries from "@/components/SermonSeries";
import FAQ from "@/components/FAQ";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f2]">

      <TopBar />

      <Navbar />

      <Hero />
      <HeartCalling />
      <SermonSeries />  
       <FAQ />
    </main>
  );
}