import bcrypt from "bcryptjs"
import { getUserModel } from "../lib/models/user"

const ADMIN_EMAIL = "marco.mendao@betacode.tech"
const ADMIN_PASSWORD = "Pocosi12!"

async function seedAdmin() {
  const User = await getUserModel()
  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12)

  const result = await User.findOneAndUpdate(
    { email: ADMIN_EMAIL },
    {
      email: ADMIN_EMAIL,
      passwordHash,
      name: "Marco Mendão",
      createdAt: new Date(),
    },
    { upsert: true, new: true }
  )

  if (result) {
    console.log(`Seeded admin user: ${ADMIN_EMAIL}`)
  }
}

seedAdmin()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Failed to seed admin user:", error)
    process.exit(1)
  })
