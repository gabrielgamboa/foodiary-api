import { and, eq, gte, lte } from "drizzle-orm";
import { db } from "../infra/db";
import { mealsTable, usersTable } from "../infra/db/schema";

export class ListMealsUsecase {
  constructor() { }

  async execute(userId: string, dateSearch: Date) {
    const startDate = new Date(dateSearch);
    const endDate = new Date(dateSearch);
    endDate.setUTCHours(23, 59, 59, 59);

    const meals = await db.query.mealsTable.findMany({
      columns: {
        id: true,
        foods: true,
        createdAt: true,
        icon: true,
        name: true,
      },
      where: and(
        eq(mealsTable.userId, userId),
        eq(mealsTable.status, 'success'),
        gte(mealsTable.createdAt, startDate),
        lte(mealsTable.createdAt, endDate),
      )
    })

    return { meals };
  }
}