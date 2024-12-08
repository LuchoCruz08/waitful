"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is Waitful?",
    answer:
      "Waitful is a powerful waitlist management platform that helps businesses and organizations efficiently collect and manage subscriber information for upcoming products, services, or events.",
  },
  {
    question: "How do I create a waitlist?",
    answer:
      "To create a waitlist, simply log in to your Waitful dashboard, click on 'New Project', fill in the project details, and customize your form fields. Once created, you'll receive a unique link to share with your audience.",
  },
  {
    question: "Can I customize the waitlist form?",
    answer:
      "Yes, Waitful allows you to fully customize your waitlist form. You can add, remove, and edit form fields to collect the specific information you need from your subscribers.",
  },
  {
    question: "How do I access my waitlist data?",
    answer:
      "You can access your waitlist data anytime through your Waitful dashboard. Navigate to your project, and you'll see options to view, export, and manage your subscriber list.",
  },
  {
    question: "Is my waitlist data secure?",
    answer:
      "Yes, we take data security seriously. All data is encrypted and stored securely. We comply with data protection regulations to ensure your subscribers' information is safe.",
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
    <div className="w-full max-w-3xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center text-white mb-8">
        Frequently Asked Questions
      </h2>
      <Accordion type="multiple" value={openItems} className="space-y-4">
        {faqData.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-slate-900 rounded-lg overflow-hidden"
          >
            <AccordionTrigger
              onClick={() => toggleItem(`item-${index}`)}
              className="px-6 py-4 text-left hover:no-underline"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
                {openItems.includes(`item-${index}`) ? (
                  <Minus className="h-5 w-5 text-blue-500" />
                ) : (
                  <Plus className="h-5 w-5 text-blue-500" />
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 py-4 text-gray-300">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
