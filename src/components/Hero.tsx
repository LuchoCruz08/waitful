import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative pt-32 sm:pt-48 pb-16 overflow-hidden">
      <div className="grid-pattern" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Welcome to
            <span className="gradient-text block mt-2 animate-gradient"> Waitful</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-gray-300 leading-relaxed">
            Experience the power of effortless waitlist management. 
            Create, manage, and grow your waitlist with Waitful - 
            the ultimate tool for launches, events, and exclusive offerings.
          </p>
          <div className="flex justify-center animate-slide-up">
            <Link href="/contact-form" passHref>
              <Button className="hero-button hover-lift text-lg px-8 py-4">
                Join Our Waitlist <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-400 animate-fade-in-delay">
            This waitlist is powered by Waitful - Try it for your next project!
          </p>
        </div>
      </div>
    </section>
  )
}

