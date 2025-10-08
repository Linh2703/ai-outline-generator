import HeroSection from "@/components/HeroSection";
import HowToUse from "@/components/HowToUse";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import CrossSell from "@/components/CrossSell";
import MoreTools from "@/components/MoreTools";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowToUse />
      <Features />
      <FAQ />
      <CrossSell />
      <MoreTools />
      <Footer />
    </div>
  );
}
