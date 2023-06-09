import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db, { Role } from "db"

export default resolver.pipe(
  async ({ email, password }: { email: string; password: string }, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
