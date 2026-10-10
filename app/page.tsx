import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HeartCalling from "@/components/HeartCalling";
import SermonSeries from "@/components/SermonSeries";
import FAQ from "@/components/FAQ";
import WatchAndWord from "@/components/WatchAndWord";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import VerseBar from "@/components/VerseBar";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f2]"> 
      <TopBar /> 
      <VerseBar />
      <Navbar /> 
      <Hero />
      <HeartCalling />
      <SermonSeries />  
       <WatchAndWord />
       <Gallery />
       <FAQ />
       <Footer />
    </main>
  );
}