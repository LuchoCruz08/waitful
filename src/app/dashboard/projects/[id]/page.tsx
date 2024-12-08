import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProjectHeader } from "@/components/projects/ProjectHeader";
import { SubscribersList } from "@/components/projects/SubscribersList";
import { FormSettings } from "@/components/projects/FormSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
  const supabase = await createClient();

  const { id: projectId } = await params;

  if (!projectId) {
    redirect("/dashboard");
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("*")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    redirect("/dashboard");
  }

  if (project.user_id !== user.id) {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ProjectHeader project={project} />

      <Tabs defaultValue="subscribers" className="w-full">
        <TabsList className="bg-slate-900/50 border-slate-800 w-full sm:w-auto">
          <TabsTrigger value="subscribers" className="flex-1 sm:flex-none">
            Subscribers
          </TabsTrigger>
          <TabsTrigger value="form" className="flex-1 sm:flex-none">
            Form Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="subscribers" className="mt-6">
          <SubscribersList projectId={projectId} />
        </TabsContent>

        <TabsContent value="form" className="mt-6">
          <FormSettings projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
