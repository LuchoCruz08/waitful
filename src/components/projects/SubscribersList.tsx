/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Download, Pencil, Search, Trash2, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

interface Subscriber {
  id: string;
  created_at: string;
  data: Record<string, any>;
  project_id: string;
}

export function SubscribersList({ projectId }: { projectId: string }) {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSubscriber, setEditingSubscriber] = useState<Subscriber | null>(null);
  const [exporting, setExporting] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchSubscribers();
  }, [projectId]);

  const fetchSubscribers = async () => {
    try {
      const { data: formFields, error: fieldsError } = await supabase
        .from("form_fields")
        .select("*")
        .eq("project_id", projectId)
        .order("order", { ascending: true });

      if (fieldsError) throw fieldsError;

      const { data: subscribers, error: subsError } = await supabase
        .from("clients")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (subsError) throw subsError;

      // Ensure data is properly formatted
      const formattedSubscribers = subscribers.map(sub => ({
        ...sub,
        data: typeof sub.data === 'string' ? JSON.parse(sub.data) : sub.data
      }));

      setSubscribers(formattedSubscribers);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (updatedData: any) => {
    if (!editingSubscriber) return;

    try {
      const { error } = await supabase
        .from("clients")
        .update({ data: updatedData })
        .eq("id", editingSubscriber.id);

      if (error) throw error;

      setEditingSubscriber(null);
      await fetchSubscribers();
      toast.success("Subscriber updated successfully");
    } catch (error) {
      console.error("Error updating subscriber:", error);
      toast.error("Failed to update subscriber");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", id);

      if (error) throw error;

      await fetchSubscribers();
      toast.success("Subscriber deleted successfully");
    } catch (error) {
      console.error("Error deleting subscriber:", error);
      toast.error("Failed to delete subscriber");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString();
  };

  const prepareExportData = (subscribers: Subscriber[]) => {
    if (subscribers.length === 0) return { headers: [], rows: [] };

    // Get all unique fields from all subscribers
    const allFields = new Set<string>();
    subscribers.forEach(subscriber => {
      Object.keys(subscriber.data || {}).forEach(key => allFields.add(key));
    });

    // Create headers with standard fields first, then custom fields
    const headers = ["Submission Date", ...Array.from(allFields)];

    // Create rows with all fields
    const rows = subscribers.map(subscriber => {
      const row: Record<string, any> = {
        "Submission Date": formatDate(subscriber.created_at),
      };

      // Add all fields, using empty string for missing values
      Array.from(allFields).forEach(field => {
        row[field] = subscriber.data[field] || "";
      });

      return row;
    });

    return { headers, rows };
  };

  const convertToCSV = (subscribers: Subscriber[]) => {
    const { headers, rows } = prepareExportData(subscribers);
    if (headers.length === 0) return "";

    const csvRows = [
      // Headers row
      headers.map(header => `"${header}"`).join(","),
      // Data rows
      ...rows.map(row =>
        headers
          .map(header => {
            const value = row[header];
            // Handle values that need escaping
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      ),
    ];

    return csvRows.join("\n");
  };

  const handleExport = async () => {
    try {
      setExporting(true);

      // Fetch fresh data for export
      const { data: exportData, error: exportError } = await supabase
        .from("clients")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at", { ascending: false });

      if (exportError) throw exportError;

      // Format the data
      const formattedData = exportData.map(sub => ({
        ...sub,
        data: typeof sub.data === 'string' ? JSON.parse(sub.data) : sub.data
      }));

      // Convert to CSV
      const csv = convertToCSV(formattedData);

      // Create and download the file
      const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const date = new Date().toISOString().split("T")[0];
      const filename = `waitlist-export-${date}.csv`;

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Record the export
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: recordError } = await supabase
          .from("exports")
          .insert([{ project_id: projectId, user_id: user.id }]);

        if (recordError) throw recordError;
      }

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
      <div className="flex items-center justify-center py-8">
        <LoaderCircle className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400">No subscribers yet.</div>
      </div>
    );
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
              <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
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
              <TableHead className="text-white">Submission Date</TableHead>
              {subscribers.length > 0 &&
                Object.keys(subscribers[0].data || {}).map((key) => (
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
                <TableCell className="text-gray-300">
                  {formatDate(subscriber.created_at)}
                </TableCell>
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
                    className="text-gray-400 hover:text-white"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-400 hover:text-red-300"
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
