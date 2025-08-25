import { APIGatewayProxyEventV2 } from 'aws-lambda'
import { ParseEvent } from "../utils/parse-event";
import { parseFunctionResponse } from "../utils/parse-function-response";
import { SignInUseCase } from "../usecases/sign-in-usecase";
import { SignInController } from "../controllers/sign-in-controller";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseEvent.execute(event);

  const signInUseCase = new SignInUseCase();
  const signUpController = new SignInController(signInUseCase);

  const response = await signUpController.handle(request);
  return parseFunctionResponse(response);
}