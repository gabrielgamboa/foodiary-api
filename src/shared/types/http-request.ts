export type HttpRequest = {
  body: Record<string, any>;
  queryParams: Record<string, any>;
  params: Record<string, any>;
}

export type ProtectedHttpRequest = HttpRequest & {
  userId: string
}