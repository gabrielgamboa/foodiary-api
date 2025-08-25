import { eq } from "drizzle-orm";
import { db } from "../infra/db";
import { usersTable } from "../infra/db/schema";
import { compare } from "bcryptjs";
import { UnauthorizedError } from "../shared/errors/unauthorized-error";
import { sign } from "jsonwebtoken";

export interface SignInUseCaseDTO {
  email: string;
  password: string;
}

export class SignInUseCase {
  async execute({ email, password }: SignInUseCaseDTO): Promise<{ accessToken: string }> {
    const user = await db.query.usersTable.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
      },
      where: eq(usersTable.email, email),
    });
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedError("Invalid Credentials");
    }
    const accessToken = sign(
      { sub: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: '3d' }
    )

    console.log({ accessToken, id: user.id, password: user.password })
    return { accessToken }
  }
}