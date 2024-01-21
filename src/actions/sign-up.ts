"use server";

import { PrismaClient } from "@prisma/client";

import { SignUpType, signUpSchema } from "@/schemas";
import { ActionsResult } from "@/types/ActionsResult";
import { handleError } from "@/lib/utils";
import { hash } from "bcrypt";
import { db } from "@/lib/db";

export const signUp = async (values: SignUpType): Promise<ActionsResult> => {
  const validatedFields = signUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password, nickname } = validatedFields.data;

  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        isSuccess: false,
        error: {
          message: "このメールアドレスは既に登録されています。",
        },
      };
    }

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        name: nickname,
        email,
        password: hashedPassword,
      },
    });

    return {
      isSuccess: true,
      message: "サインアップに成功しました。",
    };
  } catch (error) {
    handleError(error);

    return {
      isSuccess: false,
      error: {
        message: "サインアップに失敗しました。",
      },
    };
  }
};
