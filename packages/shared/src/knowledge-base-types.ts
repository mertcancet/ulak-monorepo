// --- TYPE EXPORTS FOR BARREL ---
export type KnowledgeBaseType = "file" | "text" | "website";
export type CreateKnowledgeBaseInput = {
  name: string;
  description?: string;
  type: KnowledgeBaseType;
  textContent?: string;
  websiteUrl?: string;
  fileName?: string;
  fileUrl?: string;
  workspaceId: string;
};
export type UpdateKnowledgeBaseInput = {
  name?: string;
  description?: string;
  type?: KnowledgeBaseType;
  textContent?: string | null;
  websiteUrl?: string | null;
  fileName?: string | null;
  fileUrl?: string | null;
};

export type KnowledgeBase = {
  id: string;
  workspaceId: string;
  name: string;
  description: string | null;
  type: KnowledgeBaseType;
  textContent: string | null;
  websiteUrl: string | null;
  fileName: string | null;
  fileUrl: string | null;
  createdAt: string;
  updatedAt: string;
};
