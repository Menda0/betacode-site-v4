import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { authConfig } from "@/lib/auth.config"
import { getUserModel } from "@/lib/models/user"

const credentialsSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials)
        if (!parsed.success) return null

        const { email, password } = parsed.data
        const User = await getUserModel()
        const user = await User.findOne({ email: email.toLowerCase() }).lean()

        if (!user) return null

        const isValid = await bcrypt.compare(password, user.passwordHash)
        if (!isValid) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name ?? user.email,
        }
      },
    }),
  ],
})
