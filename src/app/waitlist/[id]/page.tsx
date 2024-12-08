import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WaitlistPage({ params }: PageProps) {
  const supabase = await createClient();

  const { id: projectId } = await params;

  if (!projectId) {
    redirect("/404");
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    redirect("/404");
  }

  const { data: formFields, error: formFieldsError } = await supabase
    .from("form_fields")
    .select("*")
    .eq("project_id", project.id)
    .order("created_at", { ascending: true });

  if (formFieldsError) {
    redirect("/404");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/50 border-slate-700">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-white">
            {project.name}
          </CardTitle>
          {project.description && (
            <p className="mt-2 text-gray-400">{project.description}</p>
          )}
        </CardHeader>
        <CardContent>
          <WaitlistForm projectId={project.id} formFields={formFields} />
        </CardContent>
      </Card>
    </div>
  );
}
