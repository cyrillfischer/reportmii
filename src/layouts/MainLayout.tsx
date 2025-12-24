import { ReactNode } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  background?: ReactNode;
  hideFooter?: boolean;
}

export default function MainLayout({
  children,
  background,
  hideFooter = false,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-white text-gray-900">
      
      {/* Optionaler Background (z. B. Landing Animation) */}
      {background && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {background}
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}
