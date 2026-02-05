import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-dark">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/5 via-secondary/5 to-transparent pointer-events-none blur-3xl" />
      
      <Navbar />
      <main className="flex-1 pt-16 relative z-10">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}