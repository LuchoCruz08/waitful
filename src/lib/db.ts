import { createClient } from "@/utils/supabase/server";
import { Project } from "@/types";

export async function getProjects(userId: string): Promise<Project[]> {
  const supabase = await createClient();

  // First get all projects
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (projectsError) {
    console.error("Error fetching projects:", projectsError);
    throw projectsError;
  }

  // Then get client counts for each project
  const projectsWithCounts = await Promise.all(
    projects.map(async (project) => {
      const { count, error: countError } = await supabase
        .from("clients")
        .select("*", { count: "exact", head: true })
        .eq("project_id", project.id);

      if (countError) {
        console.error(`Error fetching client count for project ${project.id}:`, countError);
        return {
          ...project,
          _count: { clients: 0 }
        };
      }

      return {
        ...project,
        _count: { clients: count || 0 }
      };
    })
  );

  return projectsWithCounts;
}

export async function createProject(
  userId: string,
  data: Pick<Project, "name" | "description">
): Promise<Project> {
  const supabase = await createClient();

  const { data: project, error } = await supabase
    .from("projects")
    .insert([
      {
        user_id: userId,
        name: data.name,
        description: data.description,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating project:", error);
    throw error;
  }

  return {
    ...project,
    _count: { clients: 0 }
  };
}