import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WaitlistPage({ params }: PageProps) {
  const supabase = await createClient();

  // Await the params
  const { id: projectId } = await params;

  if (!projectId) {
    redirect("/404");
  }

  // Get project by ID
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    redirect("/404");
  }

  // Get form fields for the project
  const { data: formFields, error: formFieldsError } = await supabase
    .from("form_fields")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at", { ascending: true });

  if (formFieldsError) {
    redirect("/404");
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">{project.name}</h1>
          {project.description && (
            <p className="mt-2 text-gray-400">{project.description}</p>
          )}
        </div>
        <WaitlistForm projectId={project.id} formFields={formFields} />
      </div>
    </div>
  );
}
