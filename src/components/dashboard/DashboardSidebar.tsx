"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboard, LogOut, X, Lock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions";
import { useState } from "react";
import { ChangePasswordDialog } from "./ChangePasswordDialog";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

interface DashboardSidebarProps {
  onClose?: () => void;
}

export function DashboardSidebar({ onClose }: DashboardSidebarProps) {
  const pathname = usePathname();
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <aside className="flex flex-col h-full bg-slate-950/90 backdrop-blur-sm">
      {onClose && (
        <div className="p-4 flex justify-end md:hidden">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-white" />
          </Button>
        </div>
      )}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-blue-500/20 text-blue-500"
                : "text-gray-300 hover:bg-slate-800 hover:text-white",
              "bg-slate-800/50"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full text-gray-300 hover:text-white hover:bg-slate-800 bg-slate-800/50 justify-start"
          onClick={() => setShowPasswordDialog(true)}
        >
          <Lock className="h-5 w-5 mr-2" />
          Change Password
        </Button>
        <Button
          variant="ghost"
          className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/20 bg-slate-800/50 justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Close Session
        </Button>
      </div>

      <ChangePasswordDialog 
        open={showPasswordDialog} 
        onOpenChange={setShowPasswordDialog}
      />
    </aside>
  );
}
