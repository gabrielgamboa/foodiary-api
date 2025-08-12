import { HttpResponse } from "../types/http-response";
import { ok } from "../utils/http";

export class SignInController {
  async handle(): Promise<HttpResponse> {
    return ok({ accessToken: 'token de acesso'})
  }
}