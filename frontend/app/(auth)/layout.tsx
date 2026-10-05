import type { ReactNode } from "react";

// Shared frame for login, sign-up and the other account screens.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-10">
      <p className="font-heading text-3xl font-bold">معمار</p>
      {children}
    </main>
  );
}