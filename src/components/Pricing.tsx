/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const features = [
  "Unlimited Waitlists",
  "Unlimited Waitlist Subscribers",
  "Unique Waitlist Sharing Link",
  "Export information in CSV format",
  "No Watermark",
];

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const monthlyPrice = 10;
  const annualPrice = 96;
  const annualMonthlyEquivalent = annualPrice / 12;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Start your 14-day free trial today. No credit card required.
          </p>
        </div>
        <div className="flex items-center justify-center mt-8">
          <span className="text-sm font-medium mr-2 text-gray-400">
            Monthly
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className="text-sm font-medium ml-2 text-gray-400">Annual</span>
        </div>
        <div className="mx-auto max-w-sm mt-8">
          <Card className="w-full bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">
                {isAnnual ? "Annual Plan" : "Monthly Plan"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Perfect for businesses of all sizes
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-4xl font-bold text-white mb-2">
                ${isAnnual ? annualPrice : monthlyPrice}
              </div>
              <p className="text-sm text-gray-400">
                {isAnnual ? "per year" : "per month"}
              </p>
              {isAnnual && (
                <p className="text-sm text-green-500 mt-2">
                  Save 20% (Equivalent to ${annualMonthlyEquivalent.toFixed(2)}
                  /month)
                </p>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Link href="https://waitful.vercel.app/waitlist/7702b68b-ce3d-4e87-84c3-1479b4a21858">
                <Button className="w-full hero-button">
                  Start 14-Day Free Trial
                </Button>
              </Link>
              <ul className="space-y-2 text-left">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-300">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
