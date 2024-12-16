"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormField {
  id: string;
  label: string;
  type: string;
  required: boolean;
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
        setSubmitting(false);
        return;
      }

      // Submit to Supabase
      const { error } = await supabase.from("clients").insert([
        {
          project_id: projectId,
          data: formData,
        },
      ]);

      if (error) throw error;

      toast.success("Thank you for joining the waitlist!");

      // Clear form
      setFormData({});

      // Redirect to thank you page
      router.push("/waitlist/thank-you");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
      className: "bg-slate-800 border-slate-700 text-white w-full",
      placeholder: `Enter your ${field.label.toLowerCase()}`,
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
      default:
        return <Input {...commonProps} type={field.type} />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {formFields.map((field) => (
        <div key={field.id} className="space-y-2">
          <label
            htmlFor={field.label}
            className="block text-sm font-medium text-gray-200"
          >
            {field.label}{" "}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={submitting}
      >
        {submitting ? (
          <>
            <span className="animate-spin mr-2">⏳</span> Submitting...
          </>
        ) : (
          "Join Waitlist"
        )}
      </Button>
    </form>
  );
}
