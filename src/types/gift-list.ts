import { BaseResponse } from "./index";
import { z } from "zod";

// Price Range Schema
export const priceRangeSchema = z.object({
  min: z.number().min(0),
  max: z.number().positive(),
  label: z.string(),
});

// Budget Preference Schema
export const budgetPreferenceSchema = z.object({
  defaultBudget: z.number().positive().optional(),
  trackingLevel: z.enum(["group", "member", "both"]),
  priceRanges: z.array(priceRangeSchema),
  enableAnalytics: z.boolean(),
});

// Zod Schemas for validation
export const groupSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  budget: z.number().positive().optional(),
  trackingLevel: z.enum(["group", "member", "both"]).optional(),
  priceRanges: z.array(priceRangeSchema).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const memberSchema = z.object({
  id: z.string(),
  slug: z.string(),
  groupId: z.string(),
  name: z.string().min(1, "Name is required"),
  budget: z.number().positive().optional(),
  priceRanges: z.array(priceRangeSchema).optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const giftStatusEnum = z.enum(["planned", "purchased", "delivered"]);

export const giftSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  name: z.string().min(1, "Name is required"),
  cost: z.number().positive("Cost must be greater than 0"),
  status: giftStatusEnum,
  priceRange: priceRangeSchema.optional(),
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
  priority: z.number().min(1).max(5).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// TypeScript types inferred from Zod schemas
export type PriceRange = z.infer<typeof priceRangeSchema>;
export type BudgetPreference = z.infer<typeof budgetPreferenceSchema>;
export type Group = z.infer<typeof groupSchema>;
export type Member = z.infer<typeof memberSchema>;
export type Gift = z.infer<typeof giftSchema>;
export type GiftStatus = z.infer<typeof giftStatusEnum>;

// API Response types
export interface GroupsResponse extends BaseResponse {
  data: Group[];
}

export interface GroupResponse extends BaseResponse {
  data: Group;
}

export interface MembersResponse extends BaseResponse {
  data: Member[];
}

export interface MemberResponse extends BaseResponse {
  data: Member;
}

export interface GiftsResponse extends BaseResponse {
  data: Gift[];
}

export interface GiftResponse extends BaseResponse {
  data: Gift;
}

// Analytics types
export interface BudgetAnalytics {
  totalBudget: number;
  spentAmount: number;
  remainingAmount: number;
  groupBreakdown: {
    groupId: string;
    groupName: string;
    budget: number;
    spent: number;
    memberBreakdown?: {
      memberId: string;
      memberName: string;
      budget: number;
      spent: number;
    }[];
  }[];
  priceRangeBreakdown: {
    range: PriceRange;
    count: number;
    totalSpent: number;
  }[];
}

export interface GiftAnalytics {
  totalGifts: number;
  statusBreakdown: {
    status: GiftStatus;
    count: number;
  }[];
  tagBreakdown: {
    tag: string;
    count: number;
  }[];
  priceRangeBreakdown: {
    range: PriceRange;
    count: number;
  }[];
  monthlySpending: {
    month: string;
    spent: number;
    giftCount: number;
  }[];
}

// Analytics Response types
export interface BudgetAnalyticsResponse extends BaseResponse {
  data: BudgetAnalytics;
}

export interface GiftAnalyticsResponse extends BaseResponse {
  data: GiftAnalytics;
}
