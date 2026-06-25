import { getDictionary } from "@/lib/i18n";
import { DictProvider } from "@/lib/i18n/DictContext";
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

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  return (
    <DictProvider dict={dict}>
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
    </DictProvider>
  );
}
