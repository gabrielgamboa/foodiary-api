import { SignUpController } from "../controllers/sign-up-controller";
import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { ParseEvent } from "../utils/parse-event";
import { parseFunctionResponse } from "../utils/parse-function-response";
import { SignUpUseCase } from "../usecases/sign-up-usecase";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseEvent.execute(event);

  const signUpUseCase = new SignUpUseCase();
  const signUpController = new SignUpController(signUpUseCase);

  const response = await signUpController.handle(request);
  return parseFunctionResponse(response);
}