import z from "zod";
import { HttpRequest } from "../types/http-request";
import { HttpResponse } from "../types/http-response";
import { badRequest, conflictRequest, created } from "../utils/http";
import { db } from "../infra/db";
import { eq } from "drizzle-orm";
import { usersTable } from "../infra/db/schema";

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
    const userAlreadyExists = await db.query.usersTable.findFirst({
      columns: {
        email: true,
      },
      where: eq(usersTable.email, data.account.email),
    });
    if (userAlreadyExists) return conflictRequest({ error: "User Already exists with this email" });
    const [user] = await db.insert(usersTable).values({
      ...data,
      ...data.account,
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0
    }).returning({ id: usersTable.id })

    return created({ userId: user?.id })
  }
}