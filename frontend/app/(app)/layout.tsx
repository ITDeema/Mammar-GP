import type { ReactNode } from "react";
import AppHeader from "@/components/AppHeader";

// Every page inside the (app) folder gets the header automatically.
export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}