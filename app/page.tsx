import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkedWith from "@/components/WorkedWith";
import PreviousWork from "@/components/PreviousWork";
import HireMe from "@/components/HireMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WorkedWith />
        <PreviousWork />
        <HireMe />
      </main>
      <Footer />
    </>
  );
}
