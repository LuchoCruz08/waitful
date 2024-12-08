/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, Pencil, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function SubscribersList({ projectId }: { projectId: string }) {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSubscriber, setEditingSubscriber] = useState<any>(null);
  const [exporting, setExporting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchSubscribers();
  }, [projectId]);

  const fetchSubscribers = async () => {
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to fetch subscribers");
      return;
    }

    setSubscribers(data || []);
    setLoading(false);
  };

  const handleEdit = async (updatedData: any) => {
    const { error } = await supabase
      .from("clients")
      .update({ data: updatedData })
      .eq("id", editingSubscriber.id);

    if (error) {
      toast.error("Failed to update subscriber");
      return;
    }

    setEditingSubscriber(null);
    fetchSubscribers();
    toast.success("Subscriber updated");
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("clients").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete subscriber");
      return;
    }

    fetchSubscribers();
    toast.success("Subscriber deleted");
  };

  const convertToCSV = (subscribers: any[]) => {
    if (subscribers.length === 0) return "";

    const headers = Object.keys(subscribers[0].data);
    const headerRow = headers.join(",");

    const rows = subscribers.map((subscriber) => {
      return headers
        .map((header) => {
          const value = subscriber.data[header];
          if (
            typeof value === "string" &&
            (value.includes(",") || value.includes('"'))
          ) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        })
        .join(",");
    });

    return `${headerRow}\n${rows.join("\n")}`;
  };

  const handleExport = async () => {
    try {
      setExporting(true);

      const { data: exportData, error: exportError } = await supabase
        .from("clients")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (exportError) throw exportError;

      const csv = convertToCSV(exportData);

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);

      const date = new Date().toISOString().split("T")[0];
      const filename = `waitlist-export-${date}.csv`;

      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const { error: recordError } = await supabase.from("exports").insert([
        {
          project_id: projectId,
          user_id: (await supabase.auth.getUser()).data.user?.id,
        },
      ]);

      if (recordError) throw recordError;

      toast.success("Export completed successfully");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Failed to export subscribers");
    } finally {
      setExporting(false);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    Object.values(subscriber.data || {}).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="text-center text-gray-400">Loading subscribers...</div>
    );
  }

  if (subscribers.length === 0) {
    return <div className="text-center text-gray-400">No subscribers yet.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-slate-800 border-slate-700 text-white w-full"
          />
        </div>
        <Button
          variant="outline"
          className="border-blue-500 text-blue-500 w-full sm:w-auto"
          onClick={handleExport}
          disabled={exporting || subscribers.length === 0}
        >
          {exporting ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Exporting...
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </>
          )}
        </Button>
      </div>

      <div className="overflow-x-auto rounded-md border border-slate-800">
        <Table>
          <TableHeader>
            <TableRow>
              {subscribers.length > 0 &&
                subscribers[0].data &&
                Object.keys(subscribers[0].data).map((key) => (
                  <TableHead key={key} className="text-white">
                    {key}
                  </TableHead>
                ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                {Object.entries(subscriber.data || {}).map(([key, value]) => (
                  <TableCell key={key} className="text-gray-300">
                    {String(value)}
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingSubscriber(subscriber)}
                  >
                    <Pencil className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleDelete(subscriber.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!editingSubscriber}
        onOpenChange={() => setEditingSubscriber(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Subscriber</DialogTitle>
          </DialogHeader>
          {editingSubscriber && (
            <div className="space-y-4">
              {Object.entries(editingSubscriber.data || {}).map(
                ([key, value]) => (
                  <div key={key}>
                    <label className="text-sm font-medium text-white">
                      {key}
                    </label>
                    <Input
                      value={value as string}
                      onChange={(e) =>
                        setEditingSubscriber({
                          ...editingSubscriber,
                          data: {
                            ...editingSubscriber.data,
                            [key]: e.target.value,
                          },
                        })
                      }
                      className="bg-slate-800 border-slate-700 text-white"
                    />
                  </div>
                )
              )}
              <div className="flex justify-end space-x-2">
                <Button
                  variant="ghost"
                  onClick={() => setEditingSubscriber(null)}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleEdit(editingSubscriber.data)}>
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
