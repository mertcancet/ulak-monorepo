const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type Primitive = string | number | boolean;

type QueryValue = Primitive | null | undefined;

type RequestQuery = Record<string, QueryValue>;

type ApiError = {
  title?: string;
  detail?: string;
  message?: string;
};

export type FetcherOptions<TBody = unknown> = Omit<
  RequestInit,
  "body" | "headers"
> & {
  baseUrl?: string;
  headers?: HeadersInit;
  query?: RequestQuery;
  body?: TBody | BodyInit;
  credentials?: RequestCredentials;
  parseAs?: "json" | "text" | "void";
  errorMessage?: string;
};

const isBodyInit = (value: unknown): value is BodyInit => {
  return (
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    value instanceof ReadableStream ||
    typeof value === "string"
  );
};

const toUrl = (
  path: string,
  query?: RequestQuery,
  baseUrl?: string,
): string => {
  const url = new URL(path, baseUrl ?? apiBaseUrl);

  if (!query) {
    return url.toString();
  }

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) {
      continue;
    }

    url.searchParams.set(key, String(value));
  }

  return url.toString();
};

const parseJson = <T>(raw: string): T | null => {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const request = async <TResponse, TBody = unknown>(
  path: string,
  options: FetcherOptions<TBody> = {},
): Promise<TResponse> => {
  const {
    baseUrl,
    headers,
    query,
    body,
    parseAs = "json",
    credentials = "include",
    errorMessage = "Istek basarisiz oldu.",
    ...rest
  } = options;

  const requestHeaders = new Headers(headers);
  const shouldEncodeJson = body !== undefined && !isBodyInit(body);
  const requestBody =
    body === undefined
      ? undefined
      : shouldEncodeJson
        ? JSON.stringify(body)
        : body;

  if (shouldEncodeJson && !requestHeaders.has("content-type")) {
    requestHeaders.set("content-type", "application/json");
  }

  const response = await fetch(toUrl(path, query, baseUrl), {
    ...rest,
    credentials,
    headers: requestHeaders,
    body: requestBody,
  });

  if (response.status === 204 || parseAs === "void") {
    return undefined as TResponse;
  }

  const text = await response.text();
  const data = parseJson<TResponse | ApiError>(text);

  if (!response.ok) {
    const message =
      (data as ApiError | null)?.detail ??
      (data as ApiError | null)?.title ??
      (data as ApiError | null)?.message ??
      text ??
      errorMessage;

    throw new Error(message);
  }

  if (parseAs === "text") {
    return text as TResponse;
  }

  return data as TResponse;
};
