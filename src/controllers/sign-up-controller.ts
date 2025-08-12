import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/http-response";
import { ok } from "../utils/http";

export class SignUpController {
  async handle({ }: HttpRequest): Promise<HttpResponse> {
    return ok({ accessToken: 'token de acesso'})
  }
}