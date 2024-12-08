/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheckCircle, Share2, FileSpreadsheet, PenSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";

const features = [
  {
    name: "Manage Your Waitlists",
    description: "Create and track multiple projects in one centralized dashboard.",
    icon: CheckCircle,
  },
  {
    name: "Custom Forms",
    description: "Design tailored forms that capture exactly what you need from your audience.",
    icon: PenSquare,
  },
  {
    name: "Unique Share Links",
    description: "Generate and share unique links for each waitlist, simplifying distribution.",
    icon: Share2,
  },
  {
    name: "Export Your Data",
    description: "Download your waitlist data in CSV or Excel formats for easy analysis.",
    icon: FileSpreadsheet,
  },
];

export function Features() {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            Powerful <span className="gradient-text">Features</span>
          </h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to manage your waitlist effectively and grow your audience
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={feature.name} 
              className="rounded-xl bg-slate-800/30 backdrop-blur-sm p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 border border-slate-700/50"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-6">
                <feature.icon className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.name}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button className="hero-button text-lg px-8 py-4">
            Get Started Now
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-75"></div>
    </section>
  );
}
