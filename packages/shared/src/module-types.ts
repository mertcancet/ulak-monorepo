export type LLMProvider = "google";

export interface LLMSettings {
  provider: LLMProvider;
  model: string;
  instructions?: string;
  is_realtime?: boolean;
  voice?: string;
  api_key: string;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ToolBodyType = "json" | "form-data";

export interface HttpToolSettings {
  type: "HTTP";
  url: string;
  method: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
  max_retry?: number;
  parameters: Record<string, unknown>;
  body_type: ToolBodyType;
  body?: string;
  query_params?: Record<string, string>;
  follow_redirects?: boolean;
  error_message: string;
  success_message?: string;
}

export interface EndCallToolSettings {
  type: "EndCall";
  end_instructions?: string;
}

export type ToolSettings = HttpToolSettings | EndCallToolSettings;

export interface WorkspaceInput {
  name: string;
}

// Tools

export interface ToolItem {
  id: string;
  workspaceId: string;
  name: string;
  description: string;
  disallowInterruptions: boolean | null;
  settings: ToolSettings;
}

export interface Paginated<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

export interface CreateToolInput {
  name: string;
  description: string;
  disallowInterruptions?: boolean;
  settings: ToolSettings;
}

export type UpdateToolInput = Partial<CreateToolInput>;

// HTTP Tool Form

export interface HttpToolFormHeader {
  id: string;
  key: string;
  value: string;
}

export interface HttpToolFormParameter {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface HttpToolFormData {
  name: string;
  description: string;
  executionMode: "sync" | "async";
  requireSpeechBefore: boolean;
  waitForSpeechBefore: boolean;
  forbidSpeechAfter: boolean;
  allowToolChaining: boolean;
  method: HttpMethod;
  url: string;
  headers: HttpToolFormHeader[];
  timeoutSeconds: number;
  parameters: HttpToolFormParameter[];
}

// End Call Tool Form

export interface EndCallToolFormData {
  name: string;
  description: string;
  disallowInterruptions: boolean;
  endInstructions: string;
}
