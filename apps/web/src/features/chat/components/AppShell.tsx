import type { ReactNode } from "react";

interface AppShellProps {
  header: ReactNode;
  hero: ReactNode;
  children: ReactNode;
}

export function AppShell({ header, hero, children }: AppShellProps) {
  return (
    <main className="app-shell">
      {header}
      {hero}
      {children}
    </main>
  );
}