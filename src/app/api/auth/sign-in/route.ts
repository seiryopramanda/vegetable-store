import Response from "@/lib/api.response";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user || !bcrypt.compareSync(payload.password, user.password)) {
      return Response({
        message: "Invalid email or password",
        status: 404,
      });
    }

    const data: Partial<User> = {
      ...user,
      password: undefined,
    };

    return Response({
      message: "Sign In Successfully",
      data,
    });
  } catch (error) {
    return Response({
      message: "Sign In Failed",
      data: error,
      status: 500,
    });
  }
}
