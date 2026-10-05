"use client";

import { useEffect, useRef } from "react";
import Audiences from "@/components/landing/Audiences";
import Faq from "@/components/landing/Faq";
import Features from "@/components/landing/Features";
import FinalCta from "@/components/landing/FinalCta";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingHeader from "@/components/landing/LandingHeader";
import Manifesto from "@/components/landing/Manifesto";
import SourcesMarquee from "@/components/landing/SourcesMarquee";
import Trust from "@/components/landing/Trust";

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal styles only apply once JavaScript is running,
  // so the page is never left invisible if scripts fail to load.
  useEffect(() => {
    rootRef.current?.classList.add("lp-ready");
  }, []);

  return (
    <div ref={rootRef} className="lp">
      <LandingHeader />
      <main>
        <Hero />
        <SourcesMarquee />
        <Manifesto />
        <Features />
        <HowItWorks />
        <Audiences />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
