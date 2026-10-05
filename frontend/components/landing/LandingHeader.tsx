"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { IconClose, IconMenu } from "@/components/landing/Icons";
import { useCopy } from "@/components/landing/useCopy";
import { useT } from "@/lib/i18n";

export default function LandingHeader() {
  const c = useCopy().nav;
  const { lang, setLang } = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const links = [
    { href: "#features", label: c.features },
    { href: "#how", label: c.how },
    { href: "#audiences", label: c.audiences },
    { href: "#faq", label: c.faq },
  ];
  const light = !scrolled && !open; // over the dark hero
  const tone = light ? "text-white" : "text-navy-900";

  return (
    <header
      className={`lp-header fixed inset-x-0 top-0 z-50 ${tone}`}
      data-scrolled={scrolled || open}
      style={open ? { background: "rgb(246 244 239 / 0.97)" } : undefined}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="معمار">
          <BrandLogo height={46} tone={light ? "light" : "dark"} priority />
          <span className="font-heading text-xl font-bold">معمار</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex" aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative py-2">
              {link.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-pill bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className={`rounded-control border px-3 py-2 text-xs font-bold transition-colors ${light ? "border-white/25 hover:bg-white/10" : "border-navy-900/20 hover:bg-navy-900/5"}`}
          >
            {c.language}
          </button>
          <Link
            href="/login"
            className="hidden px-2 py-2 text-sm font-semibold hover:text-gold-500 sm:inline-block"
          >
            {c.login}
          </Link>
          <Link
            href="/signup"
            className="lp-btn lp-btn-gold hidden rounded-control px-5 py-2.5 text-sm font-bold sm:inline-block"
          >
            {c.start}
          </Link>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-control md:hidden"
            aria-label={c.menu}
            aria-expanded={open}
            aria-controls="lp-mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <div id="lp-mobile-menu" className="lp-menu-panel md:hidden" data-open={open}>
        <div className="overflow-hidden">
          <nav className="flex flex-col gap-1 px-6 pb-6 pt-2 text-navy-900" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-control px-3 py-3 text-base font-semibold hover:bg-navy-900/5"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex gap-3">
              <Link href="/login" className="flex-1 rounded-control border border-navy-900/20 px-4 py-3 text-center text-sm font-semibold">
                {c.login}
              </Link>
              <Link href="/signup" className="lp-btn lp-btn-gold flex-1 rounded-control px-4 py-3 text-center text-sm font-bold">
                {c.start}
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
