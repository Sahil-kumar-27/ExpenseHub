import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="flex">


        <div className="hidden md:block sticky top-0 h-screen">
          <Sidebar />
        </div>

        
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="w-64 bg-card border-r border-border">
              <Sidebar mobile onClose={() => setSidebarOpen(false)} />
            </div>

            <div
              className="flex-1 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <Navbar onMenuClick={() => setSidebarOpen(true)} />

          <main className="p-4 sm:p-6 space-y-8 animate-in fade-in duration-300">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
