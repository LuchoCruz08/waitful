export interface Project {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  _count?: {
    clients: number;
  };
}

export interface FormField {
  id: string;
  project_id: string;
  label: string;
  type: string;
  required: boolean;
  created_at: string;
}
