"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-800 bg-slate-950/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold gradient-text">Waitful</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/login">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-slate-950 transition-colors">
              Log In
            </Button>
          </Link>
          <Link href="https://waitful.vercel.app/waitlist/7702b68b-ce3d-4e87-84c3-1479b4a21858">
            <Button className="hero-button">
              Get Started
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-slate-950 p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/login">
              <Button variant="outline" className="w-full text-white border-white hover:bg-white hover:text-slate-950 transition-colors">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="w-full hero-button">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}


