import { eq } from "drizzle-orm";
import { db } from "../infra/db";
import { usersTable } from "../infra/db/schema";
import { hash } from "bcryptjs";
import { EntityAlreadyExistsError } from "../shared/errors/entity-already-exists-error";
import { sign } from "jsonwebtoken";
import { calculateGoals } from "../lib/calculateGoal";

export interface SignUpUseCaseDTO {
  goal: "lose" | "gain" | "maintain";
  gender: "male" | "female";
  birthDate: string;
  height: number;
  weight: number;
  activityLevel: number;
  account: {
    name: string;
    email: string;
    password: string;
  }
}

export class SignUpUseCase {
  async execute(data: SignUpUseCaseDTO): Promise<{ accessToken: string }> {
    const userAlreadyExists = await db.query.usersTable.findFirst({
      columns: {
        email: true,
      },
      where: eq(usersTable.email, data.account.email),
    });
    if (userAlreadyExists) throw new EntityAlreadyExistsError("user");

    const goals = calculateGoals({
      activityLevel: data.activityLevel,
      birthDate: new Date(data.birthDate),
      gender: data.gender,
      goal: data.goal,
      height: data.height,
      weight: data.weight,
    })

    const hashedPassword = await hash(data.account.password, 10);
    const [user] = await db.insert(usersTable).values({
      ...data,
      ...data.account,
      ...goals,
      password: hashedPassword,
    }).returning({ id: usersTable.id })

    const accessToken = sign(
      { sub: user?.id },
      process.env.JWT_SECRET!,
      { expiresIn: '3d' }
    )

    return { accessToken }
  }
}