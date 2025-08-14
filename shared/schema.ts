import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Google Analytics 4 data
export const ga4Sessions = pgTable("ga4_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  sessions: integer("sessions").notNull(),
  users: integer("users").notNull(),
  pageviews: integer("pageviews").notNull(),
  bounceRate: decimal("bounce_rate", { precision: 5, scale: 2 }).notNull(),
  avgSessionDuration: integer("avg_session_duration").notNull(),
  conversionRate: decimal("conversion_rate", { precision: 5, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ga4Pages = pgTable("ga4_pages", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  pagePath: text("page_path").notNull(),
  pageTitle: text("page_title").notNull(),
  pageviews: integer("pageviews").notNull(),
  uniquePageviews: integer("unique_pageviews").notNull(),
  avgTimeOnPage: integer("avg_time_on_page").notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  date: text("date").notNull(),
});

// Google Search Console data
export const searchConsoleQueries = pgTable("search_console_queries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  query: text("query").notNull(),
  clicks: integer("clicks").notNull(),
  impressions: integer("impressions").notNull(),
  ctr: decimal("ctr", { precision: 5, scale: 2 }).notNull(),
  position: decimal("position", { precision: 4, scale: 1 }).notNull(),
  changePercent: decimal("change_percent", { precision: 5, scale: 2 }).notNull(),
  date: text("date").notNull(),
});

// HubSpot CRM data
export const hubspotLeads = pgTable("hubspot_leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  leadStatus: text("lead_status").notNull(),
  leadScore: integer("lead_score"),
  source: text("source").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const hubspotMetrics = pgTable("hubspot_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  newLeads: integer("new_leads").notNull(),
  qualifiedLeads: integer("qualified_leads").notNull(),
  opportunities: integer("opportunities").notNull(),
  closedDeals: integer("closed_deals").notNull(),
  dealValue: decimal("deal_value", { precision: 12, scale: 2 }).notNull(),
});

// Schemas for API validation
export const insertGA4SessionSchema = createInsertSchema(ga4Sessions).omit({
  id: true,
  createdAt: true,
});

export const insertGA4PageSchema = createInsertSchema(ga4Pages).omit({
  id: true,
});

export const insertSearchConsoleQuerySchema = createInsertSchema(searchConsoleQueries).omit({
  id: true,
});

export const insertHubspotLeadSchema = createInsertSchema(hubspotLeads).omit({
  id: true,
  createdAt: true,
});

export const insertHubspotMetricSchema = createInsertSchema(hubspotMetrics).omit({
  id: true,
});

// Types
export type GA4Session = typeof ga4Sessions.$inferSelect;
export type GA4Page = typeof ga4Pages.$inferSelect;
export type SearchConsoleQuery = typeof searchConsoleQueries.$inferSelect;
export type HubspotLead = typeof hubspotLeads.$inferSelect;
export type HubspotMetric = typeof hubspotMetrics.$inferSelect;

export type InsertGA4Session = z.infer<typeof insertGA4SessionSchema>;
export type InsertGA4Page = z.infer<typeof insertGA4PageSchema>;
export type InsertSearchConsoleQuery = z.infer<typeof insertSearchConsoleQuerySchema>;
export type InsertHubspotLead = z.infer<typeof insertHubspotLeadSchema>;
export type InsertHubspotMetric = z.infer<typeof insertHubspotMetricSchema>;

// Keep existing user schema
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
