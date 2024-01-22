import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Cognito from "@auth/core/providers/cognito";
import type { NextAuthConfig } from "next-auth";

import { signInSchema } from "@/schemas";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Cognito({
      issuer: process.env.COGNITO_ISSUER,
      clientId: process.env.COGNITO_CLIENT_ID,
      clientSecret: process.env.COGNITO_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials, request) {
        const validatedFields = signInSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await db.user.findUnique({
            where: {
              email,
            },
          });

          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await compare(password, user.password);

          if (!passwordMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
