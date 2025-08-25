import z from "zod";
import { HttpRequest } from "../shared/types/http-request";
import { HttpResponse } from "../shared/types/http-response";
import { SignInUseCase } from "../usecases/sign-in-usecase";
import { badRequest, ok, unauthorized } from "../utils/http";
import { UnauthorizedError } from "../shared/errors/unauthorized-error";

const signInSchema = z.object({
  email: z.string().nonempty(),
  password: z.string().nonempty(),
})

export class SignInController {
  constructor(
    private readonly signInUseCase: SignInUseCase
  ) { }

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, data, error } = signInSchema.safeParse(body); //encapsular em outra classe pra reaproveitar a validação
    if (!success) return badRequest({ error: error.issues });
    try {
      const { accessToken } = await this.signInUseCase.execute(data)
      return ok({ accessToken })
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return unauthorized({ error: error.message })
      }
      return badRequest({ error: error instanceof Error ? error.message : String(error) })
    }
  }
}