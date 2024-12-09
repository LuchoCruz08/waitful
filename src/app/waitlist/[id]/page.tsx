/* eslint-disable @typescript-eslint/no-unused-vars */
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function WaitlistPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  const { id: projectId } = params;

  if (!projectId || typeof projectId !== 'string') {
    console.error("Invalid project ID:", projectId);
    redirect("/error");
  }

  try {
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .single();

    if (projectError) {
      console.error("Error fetching project:", projectError);
      redirect("/error");
    }

    if (!project) {
      console.error("Project not found:", projectId);
      redirect("/error");
    }

    const { data: formFields, error: formFieldsError } = await supabase
      .from("form_fields")
      .select("*")
      .eq("project_id", project.id)
      .order("order", { ascending: true });

    if (formFieldsError) {
      console.error("Error fetching form fields:", formFieldsError);
      redirect("/error");
    }

    if (!formFields || formFields.length === 0) {
      console.error("No form fields found for project:", project.id);
      redirect("/error");
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
  } catch (error) {
    console.error("Error in waitlist page:", error);
    redirect("/error");
  }
}
