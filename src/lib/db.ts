import { createClient } from "@/utils/supabase/server";
import { Project } from "@/types";

export async function getProjects(userId: string): Promise<Project[]> {
  const supabase = await createClient();

  const { data: projects, error } = await supabase
    .from("projects")
    .select(`
      *,
      clients:clients(count)
    `)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }

  return projects.map(project => ({
    ...project,
    _count: {
      clients: project.clients?.[0]?.count ?? 0
    }
  }));
}

export async function createProject(
  userId: string,
  data: Pick<Project, "name" | "description">
): Promise<Project> {
  const supabase = await createClient();

  const uniqueLink = `${process.env.NEXT_PUBLIC_BASE_URL}/waitlist/${crypto.randomUUID()}`;

  const { data: project, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: userId,
        name: data.name,
        description: data.description,
        unique_link: uniqueLink,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return project;
} 