/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ChevronUp, ChevronDown, Trash2, Save } from "lucide-react";
import { toast } from "sonner";
import { FormField } from "@/types";

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "url", label: "URL" },
  { value: "textarea", label: "Long Text" },
];

export function FormSettings({ projectId }: { projectId: string }) {
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchFormFields();
  }, [projectId]);

  const fetchFormFields = async () => {
    const { data, error } = await supabase
      .from("form_fields")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: true });

    if (error) {
      toast.error("Failed to fetch form fields");
      return;
    }

    setFormFields(data || []);
    setLoading(false);
  };

  const addField = () => {
    const newField: Partial<FormField> = {
      project_id: projectId,
      label: "",
      type: "text",
      required: false,
    };
    setFormFields([...formFields, newField as FormField]);
  };

  const updateField = (index: number, updates: Partial<FormField>) => {
    const newFields = [...formFields];
    newFields[index] = { ...newFields[index], ...updates };
    setFormFields(newFields);
  };

  const removeField = async (index: number) => {
    try {
      const fieldToRemove = formFields[index];

      if (fieldToRemove.id) {
        const { error } = await supabase
          .from("form_fields")
          .delete()
          .eq("id", fieldToRemove.id);

        if (error) {
          toast.error("Failed to delete field");
          return;
        }
      }

      setFormFields(formFields.filter((_, i) => i !== index));
      toast.success("Field deleted successfully");
    } catch (error) {
      console.error("Error deleting field:", error);
      toast.error("Failed to delete field");
    }
  };

  const moveField = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === formFields.length - 1)
    ) {
      return;
    }

    const newFields = [...formFields];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newFields[index], newFields[newIndex]] = [
      newFields[newIndex],
      newFields[index],
    ];
    setFormFields(newFields);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const existingFields = formFields.filter((field) => field.id);
      const newFields = formFields.filter((field) => !field.id);

      for (const field of existingFields) {
        const { error: updateError } = await supabase
          .from("form_fields")
          .update({
            label: field.label,
            type: field.type,
            required: field.required,
          })
          .eq("id", field.id);

        if (updateError) throw updateError;
      }

      if (newFields.length > 0) {
        const { error: insertError } = await supabase
          .from("form_fields")
          .insert(
            newFields.map((field) => ({
              project_id: projectId,
              label: field.label,
              type: field.type,
              required: field.required,
            }))
          );

        if (insertError) throw insertError;
      }

      await fetchFormFields();

      toast.success("Form settings saved successfully");
    } catch (error: any) {
      toast.error("Failed to save form settings");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-medium text-white">Form Fields</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="border-blue-500 text-blue-500"
            onClick={addField}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
          <Button
            className="hero-button"
            onClick={handleSave}
            disabled={saving || formFields.length === 0}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {formFields.map((field, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700"
          >
            <div className="flex sm:flex-col gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => moveField(index, "up")}
                disabled={index === 0}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => moveField(index, "down")}
                disabled={index === formFields.length - 1}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
              <div>
                <Label className="text-white">Field Label</Label>
                <Input
                  value={field.label}
                  onChange={(e) =>
                    updateField(index, { label: e.target.value })
                  }
                  placeholder="Enter field label"
                  className="bg-slate-800 border-slate-700 text-white mt-1"
                />
              </div>

              <div>
                <Label className="text-white">Field Type</Label>
                <Select
                  value={field.type}
                  onValueChange={(value) => updateField(index, { type: value })}
                >
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-1">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={field.required}
                    onCheckedChange={(checked) =>
                      updateField(index, { required: checked })
                    }
                  />
                  <Label className="text-white">Required</Label>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  onClick={() => removeField(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {formFields.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No form fields yet. Click "Add Field" to create your first field.
          </div>
        )}
      </div>
    </div>
  );
}
