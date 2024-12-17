"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "What is Waitful?",
    answer:
      "Waitful is a waitlist management platform that helps businesses and organizations efficiently collect and manage subscriber information for upcoming products, services, or events.",
  },
  {
    question: "Who can use Waitful?",
    answer:
      "Waitful is perfect for businesses, creators, event organizers, and anyone who needs an efficient way to manage a waitlist for their products, services, or events.",
  },
  {
    question: "How do I create a waitlist?",
    answer:
      "To create a waitlist, simply log in to your Waitful dashboard, click on 'New Project', fill in the project details, and customize your form fields. Once created, you'll receive a unique link to share with your audience.",
  },
  {
    question: "Can I customize the waitlist form?",
    answer:
      "Yes, Waitful allows you to customize your waitlist form. You can add, remove, and edit form fields to collect the specific information you need from your subscribers.",
  },
  {
    question: "How do I access my waitlist data?",
    answer:
      "You can access your waitlist data anytime through your Waitful dashboard. Navigate to your project, and you'll see options to view, export, and manage your subscriber list.",
  },
  {
    question: "Is Waitful free to use?",
    answer:
      "Waitful offers a 14-day free trial with no credit card or payment information required. During this period, you can explore all the platform's features. After the trial ends, you can choose from two subscription options: a monthly plan for $10 or an annual plan for $96, offering a discounted rate. If you decide not to subscribe, your account and associated data will no longer be accessible after the trial period.",
  },
  {
    question: "Is my waitlist data secure?",
    answer:
      "Yes, we take data security seriously. All data is stored securely. We comply with data protection regulations to ensure your subscribers' information is safe.",
  },
  {
    question: "How can I contact Waitful for support or inquiries?",
    answer:
      "To contact Waitful support, please send an email to lucianovcruz2004@gmail.com. Please be sure to include 'Waitful: ' followed by the type of inquiry (e.g. question, issue, comment) in the subject line to ensure your message receives a prompt and clear response.",
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (value: string) => {
    setOpenItems((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <section className="bg-slate-950 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion
          type="multiple"
          value={openItems}
          className="w-full max-w-3xl mx-auto space-y-4"
        >
          {faqData.map((item, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-slate-900 rounded-lg overflow-hidden border-slate-800"
            >
              <AccordionTrigger
                onClick={() => toggleItem(`item-${index}`)}
                className="px-6 py-4 text-left hover:no-underline text-white"
              >
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-gray-300">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
