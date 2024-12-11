/* eslint-disable @typescript-eslint/no-unused-vars */
import { createPublicClient } from "@/utils/supabase/public";
import { redirect } from "next/navigation";
import { WaitlistForm } from "@/components/waitlist/WaitlistForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: { id: string };
}

export default async function WaitlistPage({ params }: PageProps) {
  try {
    const supabase = await createPublicClient();
    const { id: projectId } = params;

    if (!projectId || typeof projectId !== 'string') {
      console.error("Invalid project ID:", projectId);
      redirect("/error");
    }

    // First, check if the project exists
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .select("id, name, description")
      .eq("id", projectId)
      .maybeSingle();

    // Log the response for debugging
    console.log("Project query response:", { project, projectError });

    if (projectError) {
      console.error("Error fetching project:", projectError);
      redirect("/error");
    }

    if (!project) {
      console.error("Project not found:", projectId);
      redirect("/error");
    }

    // Then fetch the form fields
    const { data: formFields, error: formFieldsError } = await supabase
      .from("form_fields")
      .select("id, label, type, required, placeholder")
      .eq("project_id", projectId);

    if (formFieldsError) {
      console.error("Error fetching form fields:", formFieldsError);
      redirect("/error");
    }

    if (!formFields || formFields.length === 0) {
      console.error("No form fields found for project:", projectId);
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
