"use client";

import { PrismaClient } from "@prisma/client";

import { FormType, signUpSchema } from "@/schemas";
import { ActionsResult } from "@/types/ActionsResult";
import { handleError } from "@/lib/utils";

export const signUp = async (values: FormType): Promise<ActionsResult> => {
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
    const db = new PrismaClient();
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

    await db.user.create({
      data: {
        name: nickname,
        email,
        password,
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
