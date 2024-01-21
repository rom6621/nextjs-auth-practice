import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { signInSchema } from "@/schemas";
import { compare } from "bcryptjs";
import { db } from "@/lib/db";

export default {
  providers: [
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
