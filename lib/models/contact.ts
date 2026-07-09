import mongoose, { type InferSchemaType } from "mongoose"
import { connectDB } from "@/lib/mongoose"

const answerSummarySchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: String, required: true },
  },
  { _id: false }
)

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true },
  website: { type: String },
  answers: { type: Map, of: String, default: {} },
  outcomes: { type: [String], default: [] },
  answerSummary: { type: [answerSummarySchema], default: [] },
  priceSummary: { type: String, default: "" },
  locale: { type: String, enum: ["en", "pt"], required: true },
  createdAt: { type: Date, default: Date.now },
})

export type ContactDocument = InferSchemaType<typeof contactSchema> & {
  _id: mongoose.Types.ObjectId
}

export async function getContactModel() {
  await connectDB()
  return (
    mongoose.models.Contact ??
    mongoose.model("Contact", contactSchema, "contacts")
  )
}
