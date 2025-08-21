import { HttpResponse } from "../shared/types/http-response";

export function ok(body?: Record<string, any>): HttpResponse {
  return {
    statusCode: 200,
    body: body ?? {},
  }
}


export function created(body?: Record<string, any>): HttpResponse {
  return {
    statusCode: 201,
    body: body ?? {},
  }
}

export function badRequest(body?: Record<string, any>): HttpResponse {
  return {
    statusCode: 400,
    body: body ?? {},
  }
}

export function conflictRequest(body?: Record<string, any>): HttpResponse {
  return {
    statusCode: 409,
    body: body ?? {},
  }
}