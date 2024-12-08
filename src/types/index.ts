/* eslint-disable @typescript-eslint/no-explicit-any */
export type Project = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  unique_link: string;
  created_at: string;
  updated_at: string;
  _count?: {
    clients: number;
  };
};

export type FormField = {
  id: string;
  project_id: string;
  label: string;
  type: string;
  required: boolean;
  created_at: string;
};

export type Client = {
  id: string;
  project_id: string;
  data: Record<string, any>;
  created_at: string;
};

export type Export = {
  id: string;
  user_id: string;
  project_id: string;
  created_at: string;
}; 