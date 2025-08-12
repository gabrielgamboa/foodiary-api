import { SignUpController } from "../controllers/sign-up-controller";
import { APIGatewayProxyEventV2} from 'aws-lambda'
import { ParseEvent } from "../utils/parse-event";

export async function handler(event: APIGatewayProxyEventV2) {
  const request = ParseEvent.execute(event);

  const signUpController = new SignUpController();
  const { statusCode, body } = await signUpController.handle(request)
}