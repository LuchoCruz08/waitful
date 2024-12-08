import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getProjects } from "@/lib/db";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login");
  }

  const projects = await getProjects(user.id);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Your Projects</h1>
          <p className="text-gray-400">Manage your waitlist projects</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button className="hero-button w-full sm:w-auto">
            <PlusCircle className="mr-2 h-5 w-5" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-colors cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium text-white">
                  {project.name}
                </CardTitle>
                <div className="flex flex-col items-end">
                  <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                    {project._count?.clients ?? 0} subscribers
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 line-clamp-2">
                  {project.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-blue-500/10 p-3 mb-4">
              <PlusCircle className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-medium text-white">No projects yet</h3>
            <p className="text-gray-400 mt-2 mb-4">
              Create your first project to start managing your waitlist
            </p>
            <Link href="/dashboard/projects/new">
              <Button className="hero-button w-full sm:w-auto">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Your First Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
