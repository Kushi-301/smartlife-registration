import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  registrations: defineTable({
    userType: v.string(),
    countryOfResidence: v.string(),
    emiratesId: v.optional(v.string()),
    emiratesIdExpiry: v.optional(v.string()),
    firstNameEnglish: v.string(),
    lastNameEnglish: v.string(),
    firstNameArabic: v.optional(v.string()),
    lastNameArabic: v.optional(v.string()),
    email: v.string(),
    mobile: v.string(),
    gender: v.string(),
    dateOfBirth: v.string(),
    country: v.string(),
    state: v.optional(v.string()),
    city: v.optional(v.string()),
    address: v.optional(v.string()),
    personOfDetermination: v.optional(v.boolean()),
    howDidYouHear: v.optional(v.string()),
    vat: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),
});


