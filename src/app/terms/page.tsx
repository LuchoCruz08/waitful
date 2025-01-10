/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Terms and Conditions
        </h1>

        <div className="space-y-8 max-w-3xl mx-auto">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Waitful ("we," "our," or "us"). These Terms and
              Conditions govern your use of the Waitful platform and services.
              By using Waitful, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p>
              Waitful provides a waitlist management platform for businesses and
              organizations. You agree to use this service only for lawful
              purposes and in accordance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. Account Registration
            </h2>
            <p>
              To use Waitful, you must register for an account. You are
              responsible for maintaining the confidentiality of your account
              information and for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Payment and Billing
            </h2>
            <p>
              Our order process is conducted by our online reseller Paddle.com.
              Paddle.com is the Merchant of Record for all our orders. Paddle
              provides all customer service inquiries and handles returns.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Refund Policy</h2>
            <p>
              We offer a 30-day money-back guarantee for our services. If you
              are unsatisfied with Waitful for any reason, you may request a
              full refund within 30 days of your purchase. To request a refund,
              please contact our support team at lucianovcruz2004@gmail.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Data Protection and Privacy
            </h2>
            <p>
              We are committed to protecting your personal data. Our use of your
              personal information is governed by our Privacy Policy. For more
              information, please see our{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Intellectual Property
            </h2>
            <p>
              All content, features, and functionality of the Waitful platform
              are owned by Waitful and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Limitation of Liability
            </h2>
            <p>
              Waitful shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will
              notify you of any changes by posting the new Terms on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at
              lucianovcruz2004@gmail.com.
            </p>
          </section>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
