/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Refund Policy</h1>

        <div className="space-y-8 max-w-3xl mx-auto">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Trial Period</h2>
            <p>
              Waitful offers a 14-day free trial with no credit card or payment
              information required. During this period, you can explore all the
              platform's features without any obligation to purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Refund Eligibility
            </h2>
            <p>
              We offer a 30-day money-back guarantee for our paid services. If
              you are unsatisfied with Waitful for any reason, you may request a
              full refund within 30 days of your initial purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
            <p>
              To request a refund, please contact our support team at
              lucianovcruz2004@gmail.com. Include your order number and the
              email address used for the purchase. We aim to process all refund
              requests within 5-7 business days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Subscription Cancellations
            </h2>
            <p>
              You may cancel your subscription at any time. To cancel, please
              contact us at least 48 hours before the end of your current
              billing period. Your cancellation will take effect at the next
              payment date. There are no refunds for partially used subscription
              periods.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Exceptions</h2>
            <p>
              Waitful reserves the right to refuse a refund request if we find
              evidence of fraud, refund abuse, or other manipulative behavior.
              This policy does not affect your rights as a consumer in relation
              to services which are not as described, faulty, or not fit for
              purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Changes to Refund Policy
            </h2>
            <p>
              Waitful reserves the right to modify this refund policy at any
              time. Any changes will be effective immediately upon posting the
              updated policy on our website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about our refund policy, please contact
              us at lucianovcruz2004@gmail.com.
            </p>
          </section>

          <div className="mt-12 text-center">
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Return to Home
              </Button>
            </Link>
          </div>

          <footer className="mt-16 text-center text-gray-400">
            This project is developed by{" "}
            <span className="font-semibold text-white">Cuyo Tech</span>.
          </footer>
        </div>
      </div>
    </div>
  );
}
