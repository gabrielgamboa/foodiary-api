import { SignUpController } from "../controllers/sign-up-controller";
import { APIGatewayProxyEventV2} from 'aws-lambda'
import { ParseEvent } from "../utils/parse-event";
import { parseFunctionResponse } from "../utils/parse-function-response";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseEvent.execute(event);
  const signUpController = new SignUpController();
  const response = await signUpController.handle(request);
  return parseFunctionResponse(response);
}