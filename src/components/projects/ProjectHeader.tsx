"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link2, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { toast } from "sonner";

export function ProjectHeader({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleCopyLink = () => {
    const baseUrl = window.location.origin;
    const waitlistUrl = `${baseUrl}/waitlist/${project.id}`;

    navigator.clipboard.writeText(waitlistUrl);
    toast.success(
      "Waitlist link copied to clipboard! Share it with your audience."
    );
  };

  const handleUpdateName = async () => {
    const { error } = await supabase
      .from("projects")
      .update({ name })
      .eq("id", project.id);

    if (error) {
      toast.error("Failed to update project name");
      return;
    }

    setIsEditing(false);
    router.refresh();
    toast.success("Project name updated");
  };

  const handleDelete = async () => {
    try {
      await supabase.from("form_fields").delete().eq("project_id", project.id);
      await supabase.from("clients").delete().eq("project_id", project.id);
      await supabase.from("exports").delete().eq("project_id", project.id);

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", project.id);

      if (error) throw error;

      router.push("/dashboard");
      router.refresh();
      toast.success("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
      <div className="flex-1 min-w-0 w-full sm:w-auto">
        {isEditing ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white w-full sm:w-auto"
              placeholder="Project name"
            />
            <div className="flex gap-2 mt-2 sm:mt-0 w-full sm:w-auto">
              <Button
                onClick={handleUpdateName}
                className="bg-blue-600 hover:bg-blue-700 flex-1 sm:flex-none"
              >
                Save
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                variant="ghost"
                className="flex-1 sm:flex-none"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <h2 className="text-xl font-semibold text-white truncate">
            {project.name}
          </h2>
        )}
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="flex-1 sm:flex-none border-blue-500 text-blue-500"
        >
          <Link2 className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Share Link</span>
          <span className="sm:hidden">Share</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-gray-400 hover:text-white"
            >
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => setIsEditing(true)}
              className="text-blue-500"
            >
              <Pencil className="h-4 w-4 mr-2" />
              Rename
            </DropdownMenuItem>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <DropdownMenuItem className="text-red-500">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Project</DialogTitle>
                </DialogHeader>
                <p className="text-gray-400">
                  Are you sure you want to delete this project? This action cannot
                  be undone.
                </p>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => setIsDeleteDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

