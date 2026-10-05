"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import { useCopy } from "@/components/landing/useCopy";

export default function Footer() {
  const copy = useCopy();
  const c = copy.footer;
  const links = [
    { href: "#features", label: copy.nav.features },
    { href: "#how", label: copy.nav.how },
    { href: "#audiences", label: copy.nav.audiences },
    { href: "#faq", label: copy.nav.faq },
  ];

  return (
    <footer className="bg-navy-950 pb-10 pt-16 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div className="flex items-start gap-5">
          <BrandLogo variant="full" tone="light" height={96} alt="معمار" />
          <p className="max-w-xs pt-2 font-heading text-lg font-semibold leading-8 text-white">
            {c.tagline}
          </p>
        </div>

        <nav aria-label={c.links}>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold-400">{c.links}</p>
          <ul className="grid gap-3 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="grid content-start gap-3 text-sm">
          <li className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-gold-400">
            {c.account}
          </li>
          <li>
            <Link href="/login" className="transition-colors hover:text-white">
              {copy.nav.login}
            </Link>
          </li>
          <li>
            <Link href="/signup" className="transition-colors hover:text-white">
              {copy.cta.primary}
            </Link>
          </li>
        </ul>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-wrap items-center justify-between gap-3 border-t border-white/10 px-6 pt-6 text-xs text-white/50">
        <p>{c.credit}</p>
        <p>{c.rights}</p>
      </div>
    </footer>
  );
}
