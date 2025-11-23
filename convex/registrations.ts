import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createRegistration = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    // Check if email already exists
    const existing = await ctx.db
      .query("registrations")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("Email already registered");
    }

    // Insert registration
    const registrationId = await ctx.db.insert("registrations", {
      ...args,
      createdAt: Date.now(),
    });

    return registrationId;
  },
});

// Query to get all registrations (for admin purposes)
export const getAllRegistrations = query({
  handler: async (ctx) => {
    return await ctx.db.query("registrations").order("desc").collect();
  },
});
