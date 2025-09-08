import { ProtectedHttpRequest } from "../shared/types/http-request";
import { HttpResponse } from "../shared/types/http-response";
import { MeUsecase } from "../usecases/me-usecase";
import { ok } from "../utils/http";

export class MeController {
  constructor(
    private readonly meUseCase: MeUsecase
  ) { }

  async handle({ userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const response = await this.meUseCase.execute(userId);
    return ok(response)
  }
}