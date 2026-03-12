const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type ApiError = {
  title?: string;
  detail?: string;
};

export type BusinessItem = {
  id: string;
  name: string;
  slug: string;
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type KnowledgeBaseItem = {
  id: string;
  businessId: string;
  name: string;
  description: string | null;
  isActive: boolean;
  createdByUserId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type SourceType = "file" | "text" | "website";

export type ProcessingStatus = "pending" | "processing" | "ready" | "failed";

export type KnowledgeBaseSource = {
  id: string;
  businessId: string;
  knowledgeBaseId: string;
  sourceType: SourceType;
  processingStatus: ProcessingStatus;
  title: string;
  content: string | null;
  websiteUrl: string | null;
  websiteCrawlDepth: number | null;
  fileName: string | null;
  fileMimeType: string | null;
  fileSizeBytes: number | null;
  storagePath: string | null;
  checksum: string | null;
  metadata: Record<string, unknown>;
  errorMessage: string | null;
  lastSyncedAt: string | null;
  createdByUserId: string | null;
  createdAt: string;
  updatedAt: string;
};

type CreateBusinessInput = {
  name: string;
  slug: string;
};

type CreateKnowledgeBaseInput = {
  name: string;
  description?: string;
  isActive?: boolean;
};

type UpdateKnowledgeBaseInput = {
  name?: string;
  description?: string;
  isActive?: boolean;
};

type CreateSourceInput = {
  title: string;
  sourceType: SourceType;
  processingStatus?: ProcessingStatus;
  content?: string;
  websiteUrl?: string;
  websiteCrawlDepth?: number;
  fileName?: string;
  fileMimeType?: string;
  fileSizeBytes?: number;
  storagePath?: string;
  checksum?: string;
  metadata?: Record<string, unknown>;
};

type UpdateSourceInput = {
  title?: string;
  sourceType?: SourceType;
  processingStatus?: ProcessingStatus;
  content?: string | null;
  websiteUrl?: string | null;
  websiteCrawlDepth?: number | null;
  fileName?: string | null;
  fileMimeType?: string | null;
  fileSizeBytes?: number | null;
  storagePath?: string | null;
  checksum?: string | null;
  metadata?: Record<string, unknown>;
  errorMessage?: string | null;
};

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as T | ApiError) : null;

  if (!response.ok) {
    const errorMessage =
      (data as ApiError | null)?.detail ??
      (data as ApiError | null)?.title ??
      "Istek basarisiz oldu.";

    throw new Error(errorMessage);
  }

  return data as T;
};

export const knowledgeBaseApi = {
  listBusinesses: () => request<BusinessItem[]>("/knowledge-base/businesses"),

  createBusiness: (body: CreateBusinessInput) =>
    request<BusinessItem>("/knowledge-base/businesses", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  listKnowledgeBases: (businessId: string) =>
    request<KnowledgeBaseItem[]>(
      `/knowledge-base/businesses/${businessId}/knowledge-bases`,
    ),

  createKnowledgeBase: (businessId: string, body: CreateKnowledgeBaseInput) =>
    request<KnowledgeBaseItem>(
      `/knowledge-base/businesses/${businessId}/knowledge-bases`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    ),

  updateKnowledgeBase: (
    knowledgeBaseId: string,
    body: UpdateKnowledgeBaseInput,
  ) =>
    request<KnowledgeBaseItem>(
      `/knowledge-base/knowledge-bases/${knowledgeBaseId}`,
      {
        method: "PATCH",
        body: JSON.stringify(body),
      },
    ),

  deleteKnowledgeBase: (knowledgeBaseId: string) =>
    request<void>(`/knowledge-base/knowledge-bases/${knowledgeBaseId}`, {
      method: "DELETE",
    }),

  listSources: (knowledgeBaseId: string) =>
    request<KnowledgeBaseSource[]>(
      `/knowledge-base/knowledge-bases/${knowledgeBaseId}/sources`,
    ),

  createSource: (knowledgeBaseId: string, body: CreateSourceInput) =>
    request<KnowledgeBaseSource>(
      `/knowledge-base/knowledge-bases/${knowledgeBaseId}/sources`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    ),

  updateSource: (sourceId: string, body: UpdateSourceInput) =>
    request<KnowledgeBaseSource>(`/knowledge-base/sources/${sourceId}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  deleteSource: (sourceId: string) =>
    request<void>(`/knowledge-base/sources/${sourceId}`, {
      method: "DELETE",
    }),
};
