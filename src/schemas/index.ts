import { z } from "zod";

export const signUpSchema = z.object({
  email: z
    .string({
      required_error: "メールアドレスは必須です。",
    })
    .email({
      message: "メールアドレスの形式が異なります。",
    }),
  password: z
    .string({
      required_error: "パスワードは必須です。",
    })
    .min(6, {
      message: "パスワードは6文字以上です。",
    }),
  nickname: z.string({
    required_error: "ニックネームは必須です。",
  }),
});

export type FormType = z.infer<typeof signUpSchema>;
