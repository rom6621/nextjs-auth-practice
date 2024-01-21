"use server";

import { SignInType, signInSchema } from "@/schemas";
import { signIn as NextAuthSignIn } from "@/auth";
import { ActionsResult } from "@/types/ActionsResult";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { unknown } from "zod";
import { error } from "console";
import { AuthError } from "next-auth";

export const signIn = async (values: SignInType): Promise<ActionsResult> => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await NextAuthSignIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return {
      isSuccess: true,
      message: "ログインに成功しました。",
    };
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            isSuccess: false,
            error: {
              message: "メールアドレスまたはパスワードが間違っています。",
            },
          };
        default:
          return {
            isSuccess: false,
            error: {
              message: "ログインに失敗しました。",
            },
          };
      }
    }

    throw error;
  }
};
