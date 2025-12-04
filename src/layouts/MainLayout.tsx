import { ReactNode } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

interface MainLayoutProps {
  children: ReactNode;
  background?: ReactNode;
  hideFooter?: boolean;
}

export default function MainLayout({ children, background, hideFooter = false }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      {/* Optional animated background */}
      {background && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {background}
        </div>
      )}

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
}
