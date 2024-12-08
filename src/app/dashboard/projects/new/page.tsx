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
            <SelectValue placeholder="Field Type" />
          </SelectTrigger>
          <SelectContent>
            {fieldTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={field.required}
              onCheckedChange={(checked) =>
                updateField(field.id, { required: checked })
              }
            />
            <Label className="text-white">Required</Label>
          </div>

          <Button
            type="button"
            variant="ghost"
            className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
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
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.log(error.message);
        router.push("/login");
      } else {
        setProject((prev) => ({ ...prev, user_id: data.user.id }));
        setLoading(false);
      }
    };

    fetchUser();
  }, [supabase, router]);

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

  const handleCreate = async () => {
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
        }))
      );

      if (fieldsError) throw fieldsError;

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.log(error.message);
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
                <h3 className="text-lg font-semibold text-white">
                  Form Fields
                </h3>
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

            <Button
              className="w-full hero-button"
              type="button"
              onClick={handleCreate}
              disabled={
                submitting ||
                !project.name ||
                !project.description ||
                formFields.length === 0 ||
                formFields.some((field) => !field.label)
              }
            >
              {submitting ? (
                <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <ListPlus className="mr-2 h-4 w-4" />
              )}
              {submitting ? "Creating Project..." : "Create Project"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
