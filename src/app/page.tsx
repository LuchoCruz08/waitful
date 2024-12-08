import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <CallToAction />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
