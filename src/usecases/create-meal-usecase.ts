import { db } from "../infra/db";
import { mealsTable } from "../infra/db/schema";

export interface CreateMealRequest {
  inputType: string,
}

export interface CreateMealUsecaseResponse {
  mealId: string;
}

export class CreateMealUsecase {
  constructor() { }

  async execute(userId: string, body: CreateMealRequest): Promise<CreateMealUsecaseResponse> {
    const [meal] = await db.insert(mealsTable).values({
      userId,
      foods: [],
      status: 'uploading',
      name: '',
      icon: '',
      inputFileKey: 'input_file_key',
      inputType: body.inputType === 'audio/m4a' ? 'audio' : 'picture'
    }).returning({ id: mealsTable.id });

    if (!meal) {
      throw new Error("Failed to create meal.");
    }

    return { mealId: meal.id };
  }
}