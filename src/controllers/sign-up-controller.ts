import z from "zod";
import { HttpRequest } from "../shared/types/http-request";
import { HttpResponse } from "../shared/types/http-response";
import { badRequest, conflictRequest, created } from "../utils/http";
import { db } from "../infra/db";
import { eq } from "drizzle-orm";
import { usersTable } from "../infra/db/schema";
import { hash } from 'bcryptjs';
import { SignUpUseCase } from "../usecases/sign-up-usecase";
import { EntityAlreadyExistsError } from "../shared/errors/entity-already-exists-error";

const singUpSchema = z.object({
  goal: z.enum(['LOSE', 'MAINTAIN', 'GAIN']),
  gender: z.enum(['MALE', 'FEMALE']),
  birthDate: z.iso.date(),
  height: z.number(),
  weight: z.number(),
  activityLevel: z.number().min(1).max(5),
  account: z.object({
    name: z.string().nonempty(),
    email: z.email(),
    password: z.string().min(8)
  })
})

export class SignUpController {
  constructor(
    private readonly signUpUseCase: SignUpUseCase
  ) { }

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = singUpSchema.safeParse(body);
    if (!success) {
      return badRequest({ errors: error.issues })
    }
    try {
      const { accessToken } = await this.signUpUseCase.execute(data);
      return created({ accessToken })
    } catch (error) {
      if (error instanceof EntityAlreadyExistsError) {
        return conflictRequest({ error: error.message })
      }

      return badRequest({ error: error instanceof Error ? error.message : String(error) })
    }
  }
}