"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useT } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n";
import { mockUser } from "@/lib/user";

const links: { href: string; key: TranslationKey }[] = [
  { href: "/saved", key: "nav.saved" },
  { href: "/history", key: "nav.history" },
];

export default function AppHeader() {
  const { t } = useT();
  const pathname = usePathname();

  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="font-heading text-lg font-bold">
          {t("brand.name")}
        </Link>

        <nav className="flex items-center gap-6 text-sm font-semibold">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-16 items-center border-b-2 ${active ? "border-dusk-500 text-stone-900" : "border-transparent text-stone-600 hover:text-stone-900"}`}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/profile"
          aria-label={t("nav.profile")}
          className={`flex h-8 w-8 items-center justify-center rounded-pill border bg-stone-100 text-sm font-bold ${pathname === "/profile" ? "border-dusk-500 ring-2 ring-dusk-500" : "border-stone-200"}`}
        >
          {mockUser.name.charAt(0)}
        </Link>
      </div>
    </header>
  );
}