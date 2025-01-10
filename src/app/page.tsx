/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { CallToAction } from "@/components/CallToAction";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Pricing } from "@/components/Pricing";

export default function Home() {
  useEffect(() => {
    (function () {
      const script = document.createElement("script");
      script.src = "https://clearfeedback.vercel.app/api/widget";
      script.async = true;
      script.onload = function () {
        if ((window as any).FeedbackWidget) {
          (window as any).FeedbackWidget.init("f9dfcb0a-aae6-4b12-8213-0859b7f07560");
        }
      };
      document.head.appendChild(script);
    })();
  }, []);

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
