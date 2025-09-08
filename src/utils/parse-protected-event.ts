import { APIGatewayProxyEventV2 } from "aws-lambda";
import { HttpRequest, ProtectedHttpRequest } from "../shared/types/http-request";
import { ParseEvent } from "./parse-event";
import { JwtPayload, verify } from "jsonwebtoken";

export class ParseProtectedEvent {
  static execute(event: APIGatewayProxyEventV2): ProtectedHttpRequest {
    const baseEvent = ParseEvent.execute(event);
    const { authorization } = event.headers;
    if (!authorization) throw new Error('Access Token not provided');
    const [, token] = authorization.split(' ');
    const { sub } = verify(token!, process.env.JWT_SECRET!) as JwtPayload;
    console.log({
      ...baseEvent,
      userId: sub as string
    })
    return {
      ...baseEvent,
      userId: sub as string
    }
  }
}