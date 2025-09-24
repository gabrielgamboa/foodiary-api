import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { parseFunctionResponse } from "../utils/parse-function-response";
import { ParseProtectedEvent } from '../utils/parse-protected-event';
import { ListMealsUsecase } from '../usecases/list-meals-usecase';
import { ListMealsController } from '../controllers/list-meals-controller';

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseProtectedEvent.execute(event);

  const listMealsUsecase = new ListMealsUsecase();
  const listMealsController = new ListMealsController(listMealsUsecase);

  const response = await listMealsController.handle(request);
  return parseFunctionResponse(response);
}