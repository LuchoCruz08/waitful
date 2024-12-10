import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import Link from "next/link";

export function CallToAction() {
  return (
    <section className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-16 sm:px-12 sm:py-24 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 transform -translate-y-1/2 -translate-x-1/4">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                <circle cx="200" cy="200" r="200" fill="url(#paint0_radial)" />
                <defs>
                  <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <div className="absolute right-0 bottom-0 transform translate-y-1/2 translate-x-1/4">
              <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
                <circle cx="200" cy="200" r="200" fill="url(#paint1_radial)" />
                <defs>
                  <radialGradient id="paint1_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 200) rotate(90) scale(200)">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mb-6">
              Start managing your waitlists today!
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-xl text-blue-50 mb-10">
              Join Waitful to manage their waitlists efficiently and grow their audience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="">
              <Button className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Join the Waitlist
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

