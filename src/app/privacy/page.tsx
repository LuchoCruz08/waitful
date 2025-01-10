/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>

        <div className="space-y-8 max-w-3xl mx-auto">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Waitful's Privacy Policy. This policy describes how
              Waitful ("we", "our", or "us") collects, uses, and protects your
              personal information when you use our waitlist management platform
              and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p>We collect information you provide directly to us, such as:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Account information (name, email address, password)</li>
              <li>Profile information (company name, job title)</li>
              <li>Payment information (processed by our payment provider)</li>
              <li>
                Waitlist data (information you collect from your subscribers)
              </li>
              <li>Communications you have with us</li>
            </ul>
            <p className="mt-4">
              We also automatically collect certain information about how you
              interact with our services, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Usage data (pages visited, features used, time spent on the
                platform)
              </li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>
                Send you technical notices, updates, security alerts, and
                support messages
              </li>
              <li>
                Respond to your comments, questions, and customer service
                requests
              </li>
              <li>Communicate with you about products, services, and events</li>
              <li>
                Monitor and analyze trends, usage, and activities in connection
                with our services
              </li>
              <li>
                Detect, investigate, and prevent fraudulent transactions and
                other illegal activities
              </li>
              <li>
                Personalize and improve the services and provide content or
                features that match user profiles or interests
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Data Sharing and Disclosure
            </h2>
            <p>We may share your information in the following situations:</p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>With your consent or at your direction</li>
              <li>
                With vendors, consultants, and other service providers who need
                access to such information to carry out work on our behalf
              </li>
              <li>
                In response to a request for information if we believe
                disclosure is in accordance with, or required by, any applicable
                law or legal process
              </li>
              <li>
                If we believe your actions are inconsistent with our user
                agreements or policies, or to protect the rights, property, and
                safety of Waitful or others
              </li>
              <li>
                In connection with, or during negotiations of, any merger, sale
                of company assets, financing, or acquisition of all or a portion
                of our business by another company
              </li>
              <li>
                Between and among Waitful and our current and future parents,
                affiliates, subsidiaries, and other companies under common
                control and ownership
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We take reasonable measures to help protect information about you
              from loss, theft, misuse, unauthorized access, disclosure,
              alteration, and destruction. However, no internet or email
              transmission is ever fully secure or error-free.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Your Rights and Choices
            </h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Accessing, correcting, or deleting your personal information
              </li>
              <li>
                Objecting to or restricting certain processing of your data
              </li>
              <li>Requesting a copy of your personal data</li>
              <li>
                Withdrawing consent for certain data processing activities
              </li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us using the information
              provided in the "Contact Us" section.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Children's Privacy
            </h2>
            <p>
              Our services are not intended for children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you are a parent or guardian and believe we may have
              collected information about a child, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. We will
              notify you of any changes by posting the new privacy policy on
              this page and updating the "Last updated" date at the top of this
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data
              practices, please contact us at:
            </p>
            <p className="mt-2">Email: lucianovcruz2004@gmail.com</p>
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
