import { ProtectedHttpRequest } from "../shared/types/http-request";
import { HttpResponse } from "../shared/types/http-response";
import { ok } from "../utils/http";

export class MeController {
  constructor(
  ) { }

  async handle({ body, userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    return ok({ userId })
  }
}