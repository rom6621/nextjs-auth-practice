"use client";

import { FormType, signUpSchema } from "@/schemas";
import { ActionsResult } from "@/types/ActionsResult";

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

  return {
    isSuccess: true,
    message: "サインアップに成功しました。",
  };
};
