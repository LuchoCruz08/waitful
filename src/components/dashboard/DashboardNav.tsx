"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";

export function DashboardNav() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mr-2 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5 text-white" />
          </Button>
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">Waitful</span>
          </Link>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {/* Add navigation items here if needed */}
        </nav>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm md:hidden">
          <div className="fixed inset-y-0 left-0 w-64 bg-slate-950 shadow-lg">
            <DashboardSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
