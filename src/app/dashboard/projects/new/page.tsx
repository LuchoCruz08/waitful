/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createClient } from "@/utils/supabase/client";
import {
  LoaderCircle,
  ListPlus,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type FormField = {
  id: string;
  label: string;
  type: string;
  required: boolean;
};

const fieldTypes = [
  { value: "text", label: "Text" },
  { value: "email", label: "Email" },
  { value: "tel", label: "Phone" },
  { value: "number", label: "Number" },
  { value: "url", label: "URL" },
  { value: "textarea", label: "Long Text" },
];

function FormFieldItem({
  field,
  updateField,
  removeField,
  moveField,
  isFirst,
  isLast,
}: {
  field: FormField;
  updateField: (id: string, updates: Partial<FormField>) => void;
  removeField: (id: string) => void;
  moveField: (id: string, direction: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
      <div className="flex sm:flex-col gap-1">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white"
          onClick={() => moveField(field.id, "up")}
          disabled={isFirst}
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-400 hover:text-white"
          onClick={() => moveField(field.id, "down")}
          disabled={isLast}
        >
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        <Input
          value={field.label}
          onChange={(e) => updateField(field.id, { label: e.target.value })}
          placeholder="Field Label"
          className="bg-slate-800 border-slate-700 text-white"
        />

        <Select
          value={field.type}
          onValueChange={(value) => updateField(field.id, { type: value })}
        >
          <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id={`required-${field.id}`}
              checked={field.required}
              onCheckedChange={(checked) =>
                updateField(field.id, { required: checked })
              }
            />
            <Label
              htmlFor={`required-${field.id}`}
              className="text-sm text-gray-400"
            >
              Required
            </Label>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-red-400/10"
            onClick={() => removeField(field.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateProject() {
  const supabase = createClient();
  const router = useRouter();
  const [project, setProject] = useState({
    name: "",
    description: "",
    user_id: "",
  });

  const [formFields, setFormFields] = useState<FormField[]>([
    { id: "1", label: "Name", type: "text", required: true },
    { id: "2", label: "Email", type: "email", required: true },
  ]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error || !user) {
          toast.error("Please sign in to continue");
          router.push("/login");
          return;
        }

        setProject((prev) => ({ ...prev, user_id: user.id }));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("An error occurred while loading your data");
        router.push("/login");
      }
    };

    fetchUser();
  }, [router, supabase.auth]);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const addField = () => {
    const newField: FormField = {
      id: crypto.randomUUID(),
      label: "",
      type: "text",
      required: false,
    };
    setFormFields([...formFields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(
      formFields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id));
  };

  const moveField = (id: string, direction: "up" | "down") => {
    const index = formFields.findIndex((field) => field.id === id);
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

  const validateForm = () => {
    if (!project.name.trim()) {
      toast.error("Project name is required");
      return false;
    }

    if (!project.description.trim()) {
      toast.error("Project description is required");
      return false;
    }

    if (formFields.length === 0) {
      toast.error("At least one form field is required");
      return false;
    }

    for (const field of formFields) {
      if (!field.label.trim()) {
        toast.error("All fields must have a label");
        return false;
      }
    }

    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    try {
      setSubmitting(true);

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .insert([
          {
            user_id: project.user_id,
            name: project.name,
            description: project.description,
          },
        ])
        .select()
        .single();

      if (projectError) throw projectError;

      const { error: fieldsError } = await supabase.from("form_fields").insert(
        formFields.map((field, index) => ({
          project_id: projectData.id,
          label: field.label,
          type: field.type,
          required: field.required,
          order: index,
        }))
      );

      if (fieldsError) throw fieldsError;

      toast.success("Project created successfully!");
      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Error creating project:", error);
      toast.error(error.message || "Failed to create project");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div
        role="status"
        className="flex items-center justify-center min-h-screen bg-slate-950"
      >
        <LoaderCircle className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="w-full max-w-3xl mx-auto bg-slate-900/50 border-slate-800">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ListPlus className="h-12 w-12 text-blue-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">
            Create New Project
          </CardTitle>
          <CardDescription className="text-gray-400">
            Set up a new waitlist project and customize your form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={project.name}
                  onChange={onChange}
                  placeholder="My Awesome Project"
                  required
                  className="bg-slate-800 border-slate-700 placeholder-gray-400 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={project.description}
                  onChange={onChange}
                  placeholder="Describe your project and what you're collecting waitlist entries for..."
                  required
                  className="bg-slate-800 border-slate-700 placeholder-gray-400 text-white min-h-[100px]"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h3 className="text-lg font-semibold text-white">Form Fields</h3>
                <Button
                  type="button"
                  onClick={addField}
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-500/10 w-full sm:w-auto"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>

              <div className="space-y-4">
                {formFields.map((field, index) => (
                  <FormFieldItem
                    key={field.id}
                    field={field}
                    updateField={updateField}
                    removeField={removeField}
                    moveField={moveField}
                    isFirst={index === 0}
                    isLast={index === formFields.length - 1}
                  />
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleCreate}
                disabled={submitting}
                className="w-full sm:w-auto"
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Project"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
