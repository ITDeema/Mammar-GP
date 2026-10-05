import type { ReactNode } from "react";
import AppHeader from "@/components/AppHeader";
import { ResultsProvider } from "@/lib/results";

// Every page inside the (app) folder gets the header and the shared
// results data (saved / history / rename) automatically.
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ResultsProvider>
      <AppHeader />
      {children}
    </ResultsProvider>
  );
}