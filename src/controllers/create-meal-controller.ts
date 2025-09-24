import z from "zod";
import { ProtectedHttpRequest } from "../shared/types/http-request";
import { HttpResponse } from "../shared/types/http-response";
import { badRequest, ok } from "../utils/http";
import { CreateMealUsecase } from "../usecases/create-meal-usecase";

const schema = z.object({
  fileType: z.enum(['audio/m4a', 'image/jpeg']),
})

export class CreateMealController {
  constructor(
    private readonly createMealUsecase: CreateMealUsecase
  ) { }

  async handle({ body, userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, data, error } = schema.safeParse(body);
    if (!success) return badRequest({ error: error.issues });

    const response = await this.createMealUsecase.execute(userId, { inputType: data.fileType });
    return ok(response)
  }
}