import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-white">Social</h3>
            <ul className="mt-4 flex space-x-4">
              <li>
                <Link
                  href="https://www.linkedin.com/in/lucianovcruz/"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:lucianovcruz2004@gmail.com?subject=From Waitful"
                  className="text-gray-300 hover:text-white"
                  target="_blank"
                >
                  <Mail className="h-6 w-6"/>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Waitful. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 