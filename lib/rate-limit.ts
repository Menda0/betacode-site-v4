import { createHash } from "node:crypto"
import mongoose from "mongoose"
import { connectDB } from "@/lib/mongoose"

const rateLimitSchema = new mongoose.Schema({
  key: { type: String, required: true, index: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
})

async function getRateLimitModel() {
  await connectDB()
  return (
    mongoose.models.RateLimit ??
    mongoose.model("RateLimit", rateLimitSchema, "rate_limits")
  )
}

export type RateLimitRule = { key: string; limit: number; windowMs: number }

function hashKey(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 32)
}

/**
 * Records one hit for each rule key and reports whether any rule is over its limit.
 * Keys are hashed so raw IPs and emails are not stored.
 */
export async function checkRateLimit(rules: RateLimitRule[]): Promise<{ limited: boolean }> {
  const RateLimit = await getRateLimitModel()
  const now = Date.now()

  for (const rule of rules) {
    const key = hashKey(rule.key)
    const count = await RateLimit.countDocuments({
      key,
      createdAt: { $gte: new Date(now - rule.windowMs) },
    })
    if (count >= rule.limit) return { limited: true }
  }

  await RateLimit.insertMany(rules.map((rule) => ({ key: hashKey(rule.key), createdAt: new Date(now) })))
  return { limited: false }
}

export function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}
