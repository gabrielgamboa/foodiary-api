import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { parseFunctionResponse } from "../utils/parse-function-response";
import { MeController } from '../controllers/me-controller';
import { ParseProtectedEvent } from '../utils/parse-protected-event';
import { unauthorized } from '../utils/http';
import { MeUsecase } from '../usecases/me-usecase';

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseProtectedEvent.execute(event);

  const meUseCase = new MeUsecase();
  const meController = new MeController(meUseCase);

  const response = await meController.handle(request);
  return parseFunctionResponse(response);

}