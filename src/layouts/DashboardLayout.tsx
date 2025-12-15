// src/layouts/DashboardLayout.tsx
import { ReactNode } from "react";
import { Header } from "../components/Header";

type DashboardLayoutProps = {
  children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 to-teal-500 text-white">
      
      {/* 🔝 FIXED DASHBOARD HEADER */}
      <Header />

      {/* 🔽 CONTENT AREA */}
      <main className="pt-24 px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
