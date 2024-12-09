/* eslint-disable @typescript-eslint/no-unused-vars */
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
import {
  Copy,
  Download,
  Link2,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

export function ProjectHeader({ project }: { project: Project }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(project.name);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleCopyLink = () => {
    const baseUrl = window.location.origin;
    const waitlistUrl = `/waitlist/${project.id}`;

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

  const handleExportCSV = async () => {
    try {
      const { data: subscribers, error } = await supabase
        .from("clients")
        .select("*")
        .eq("project_id", project.id);

      if (error) throw error;

      if (!subscribers || subscribers.length === 0) {
        toast.info("No subscribers to export");
        return;
      }

      const csvContent = [
        Object.keys(subscribers[0]).join(","),
        ...subscribers.map((item) => Object.values(item).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `${project.name}_subscribers.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      toast.success("CSV exported successfully");
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast.error("Failed to export CSV");
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        {isEditing ? (
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-slate-800 border-slate-700 text-white"
            />
            <Button onClick={handleUpdateName}>Save</Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <h1 className="text-2xl font-bold text-white">{project.name}</h1>
        )}
      </div>

      <div className="flex items-center space-x-2 w-full sm:w-auto">
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 w-full sm:w-auto"
          onClick={handleCopyLink}
        >
          <Link2 className="h-4 w-4 mr-2" />
          Copy Link
        </Button>

        <Button
          variant="outline"
          className="border-green-500 text-green-500 w-full sm:w-auto"
          onClick={handleExportCSV}
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button  className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(true)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Name
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleCopyLink}>
              <Copy className="h-4 w-4 mr-2" />
              Copy Link
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Project
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-slate-900 border-slate-800">
            <DialogHeader>
              <DialogTitle className="text-white">Delete Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-slate-400">
                Are you sure you want to delete this project? This action cannot
                be undone and will delete all associated data including form
                fields, client submissions, and exports.
              </p>
              <div className="flex justify-end space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete();
                    setIsDeleteDialogOpen(false);
                  }}
                >
                  Delete Project
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
