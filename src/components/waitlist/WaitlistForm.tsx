"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
  order: number;
}

interface WaitlistFormProps {
  projectId: string;
  formFields: FormField[];
}

export function WaitlistForm({ projectId, formFields }: WaitlistFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Validate required fields
      const missingFields = formFields
        .filter((field) => field.required && !formData[field.label])
        .map((field) => field.label);

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in the following required fields: ${missingFields.join(
            ", "
          )}`
        );
        return;
      }

      // Validate email fields
      const emailFields = formFields.filter((field) => field.type === "email");
      for (const field of emailFields) {
        const email = formData[field.label];
        if (email && !isValidEmail(email)) {
          toast.error(`Please enter a valid email address for ${field.label}`);
          return;
        }
      }

      // Validate URL fields
      const urlFields = formFields.filter((field) => field.type === "url");
      for (const field of urlFields) {
        const url = formData[field.label];
        if (url && !isValidUrl(url)) {
          toast.error(`Please enter a valid URL for ${field.label}`);
          return;
        }
      }

      // Validate phone fields
      const phoneFields = formFields.filter((field) => field.type === "tel");
      for (const field of phoneFields) {
        const phone = formData[field.label];
        if (phone && !isValidPhone(phone)) {
          toast.error(`Please enter a valid phone number for ${field.label}`);
          return;
        }
      }

      const { error } = await supabase.from("clients").insert([
        {
          project_id: projectId,
          data: formData,
        },
      ]);

      if (error) throw error;

      toast.success("Thank you for joining the waitlist!");
      setFormData({});
      router.push("/waitlist/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidPhone = (phone: string) => {
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(phone.replace(/\s+/g, ""));
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      id: field.label,
      name: field.label,
      value: formData[field.label] || "",
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) =>
        setFormData((prev) => ({
          ...prev,
          [field.label]: e.target.value,
        })),
      required: field.required,
      className:
        "bg-slate-800 border-slate-700 text-white w-full focus:ring-2 focus:ring-blue-500",
      placeholder: `Enter your ${field.label.toLowerCase()}`,
      "aria-label": field.label,
    };

    switch (field.type) {
      case "textarea":
        return <Textarea {...commonProps} rows={4} />;
      case "tel":
        return (
          <Input
            {...commonProps}
            type="tel"
            pattern="[0-9+\-\s()]+"
            title="Please enter a valid phone number"
          />
        );
      case "email":
        return (
          <Input
            {...commonProps}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="Please enter a valid email address"
          />
        );
      case "url":
        return (
          <Input
            {...commonProps}
            type="url"
            pattern="https?://.+"
            title="Please enter a valid URL starting with http:// or https://"
          />
        );
      case "number":
        return (
          <Input
            {...commonProps}
            type="number"
            step="any"
            title="Please enter a valid number"
          />
        );
      default:
        return <Input {...commonProps} type={field.type} />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formFields.map((field) => (
        <div key={field.id} className="space-y-2">
          <Label
            htmlFor={field.label}
            className="block text-sm font-medium text-gray-200"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {renderField(field)}
        </div>
      ))}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Join Waitlist"
        )}
      </Button>
    </form>
  );
}
