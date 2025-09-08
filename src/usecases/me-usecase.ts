import { eq } from "drizzle-orm";
import { db } from "../infra/db";
import { usersTable } from "../infra/db/schema";

export interface MeUseCaseResponse {
  name: string;
  id: string;
  email: string;
  calories: number;
  proteins: number;
  carbohydrates: number;
  fats: number;
}

export class MeUsecase {
  constructor() { }

  async execute(userId: string): Promise<MeUseCaseResponse> {
    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        name: true,
        email: true,
        calories: true,
        proteins: true,
        carbohydrates: true,
        fats: true
      },
      where: eq(usersTable.id, userId)
    })

    if (!user) throw new Error('user not found')

    return user;
  }
}