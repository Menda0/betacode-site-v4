import mongoose, { type InferSchemaType } from "mongoose"
import { connectDB } from "@/lib/mongoose"

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  createdAt: { type: Date, default: Date.now },
})

export type UserDocument = InferSchemaType<typeof userSchema> & {
  _id: mongoose.Types.ObjectId
}

export async function getUserModel() {
  await connectDB()
  return (
    mongoose.models.User ??
    mongoose.model("User", userSchema, "users")
  )
}
