import z from "zod";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/http-response";
import { badRequest, created } from "../utils/http";

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
  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    const { success, error, data } = singUpSchema.safeParse(body);
    if (!success) {
      return badRequest({ errors: error.issues })
    }
    return created({ data })
  }
}