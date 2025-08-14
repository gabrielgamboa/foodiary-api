import { HttpResponse } from "../types/http-response"

export const parseFunctionResponse = ({ statusCode, body }: HttpResponse)  => {
  return {
    statusCode,
    body: body ? JSON.stringify(body) : undefined
  }
}