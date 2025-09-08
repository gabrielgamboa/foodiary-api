import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { parseFunctionResponse } from "../utils/parse-function-response";
import { MeController } from '../controllers/me-controller';
import { ParseProtectedEvent } from '../utils/parse-protected-event';
import { unauthorized } from '../utils/http';

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseProtectedEvent.execute(event);
  const meController = new MeController();
  const response = await meController.handle(request);
  return parseFunctionResponse(response);

}