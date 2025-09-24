import z from "zod";
import { ProtectedHttpRequest } from "../shared/types/http-request";
import { HttpResponse } from "../shared/types/http-response";
import { badRequest, ok } from "../utils/http";
import { ListMealsUsecase } from "../usecases/list-meals-usecase";

const schema = z.object({
  date: z.iso.date().transform(dateString => new Date(dateString)),
})

export class ListMealsController {
  constructor(
    private readonly listMealsUsecase: ListMealsUsecase
  ) { }

  async handle({ queryParams, userId }: ProtectedHttpRequest): Promise<HttpResponse> {
    const { success, data, error } = schema.safeParse(queryParams);
    if (!success) return badRequest({ error: error.issues });

    const response = await this.listMealsUsecase.execute(userId, data.date);
    return ok(response)
  }
}