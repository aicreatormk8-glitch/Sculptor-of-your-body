import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Program from "@/components/sections/Program";
import WhyMe from "@/components/sections/WhyMe";
import Results from "@/components/sections/Results";
import CTA from "@/components/sections/CTA";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Program />
        <WhyMe />
        <Results />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
