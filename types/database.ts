export type UserRole = "pending" | "member" | "admin";
export type ApprovalStatus = "pending" | "approved" | "rejected" | "suspended";
export type ResourceVisibility = "public" | "members" | "admins";
export type PostStatus = "draft" | "pending" | "published" | "hidden" | "deleted";
export type RequestStatus = "pending" | "approved" | "rejected" | "cancelled";

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  display_name: string | null;
  phone: string | null;
  city_region: string | null;
  preferred_language: string | null;
  bio: string | null;
  role: UserRole;
  approval_status: ApprovalStatus;
  contact_sharing_preference: string;
  created_at: string;
  updated_at: string;
};

export type Resource = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  type: string;
  category_id: string | null;
  visibility: ResourceVisibility;
  file_path: string | null;
  external_url: string | null;
  video_url: string | null;
  thumbnail_path: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  resource_categories?: { name: string; slug: string } | null;
};

export type BulletinPost = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  category: string;
  city_region: string | null;
  child_age_range: string | null;
  status: PostStatus;
  allow_connection_requests: boolean;
  created_at: string;
  updated_at: string;
};

export type ConnectionRequest = {
  id: string;
  requester_id: string;
  recipient_id: string;
  post_id: string;
  message: string;
  status: RequestStatus;
  created_at: string;
  updated_at: string;
};

type LooseTable = {
  Row: Record<string, unknown>;
  Insert: Record<string, unknown>;
  Update: Record<string, unknown>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: Record<string, LooseTable>;
    Views: Record<string, LooseTable>;
    Functions: Record<string, never>;
    Enums: Record<string, string>;
    CompositeTypes: Record<string, never>;
  };
};
