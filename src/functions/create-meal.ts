import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { parseFunctionResponse } from "../utils/parse-function-response";
import { ParseProtectedEvent } from '../utils/parse-protected-event';
import { CreateMealUsecase } from '../usecases/create-meal-usecase';
import { CreateMealController } from '../controllers/create-meal-controller';

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseProtectedEvent.execute(event);

  const createMealUsecase = new CreateMealUsecase();
  const createMealController = new CreateMealController(createMealUsecase);

  const response = await createMealController.handle(request);
  return parseFunctionResponse(response);
}