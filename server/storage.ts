import { 
  type User, type InsertUser,
  type GA4Session, type InsertGA4Session,
  type GA4Page, type InsertGA4Page,
  type SearchConsoleQuery, type InsertSearchConsoleQuery,
  type HubspotLead, type InsertHubspotLead,
  type HubspotMetric, type InsertHubspotMetric
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // GA4 methods
  getGA4Sessions(days?: number): Promise<GA4Session[]>;
  getGA4Pages(limit?: number): Promise<GA4Page[]>;
  
  // Search Console methods
  getSearchConsoleQueries(limit?: number): Promise<SearchConsoleQuery[]>;
  
  // HubSpot methods
  getHubspotLeads(limit?: number): Promise<HubspotLead[]>;
  getHubspotMetrics(days?: number): Promise<HubspotMetric[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private ga4Sessions: GA4Session[];
  private ga4Pages: GA4Page[];
  private searchConsoleQueries: SearchConsoleQuery[];
  private hubspotLeads: HubspotLead[];
  private hubspotMetrics: HubspotMetric[];

  constructor() {
    this.users = new Map();
    this.ga4Sessions = this.generateGA4Sessions();
    this.ga4Pages = this.generateGA4Pages();
    this.searchConsoleQueries = this.generateSearchConsoleQueries();
    this.hubspotLeads = this.generateHubspotLeads();
    this.hubspotMetrics = this.generateHubspotMetrics();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getGA4Sessions(days: number = 30): Promise<GA4Session[]> {
    return this.ga4Sessions.slice(-days);
  }

  async getGA4Pages(limit: number = 10): Promise<GA4Page[]> {
    return this.ga4Pages.slice(0, limit);
  }

  async getSearchConsoleQueries(limit: number = 10): Promise<SearchConsoleQuery[]> {
    return this.searchConsoleQueries.slice(0, limit);
  }

  async getHubspotLeads(limit: number = 10): Promise<HubspotLead[]> {
    return this.hubspotLeads.slice(0, limit);
  }

  async getHubspotMetrics(days: number = 30): Promise<HubspotMetric[]> {
    return this.hubspotMetrics.slice(-days);
  }

  private generateGA4Sessions(): GA4Session[] {
    const sessions: GA4Session[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const baseSession = 3200 + Math.random() * 1600;
      const sessions_count = Math.floor(baseSession + Math.sin(i / 7) * 400);
      
      sessions.push({
        id: randomUUID(),
        date: date.toISOString().split('T')[0],
        sessions: sessions_count,
        users: Math.floor(sessions_count * 0.75),
        pageviews: Math.floor(sessions_count * 2.1),
        bounceRate: "45.20",
        avgSessionDuration: Math.floor(120 + Math.random() * 60),
        conversionRate: "3.24",
        createdAt: new Date(),
      });
    }
    
    return sessions;
  }

  private generateGA4Pages(): GA4Page[] {
    const pages = [
      { path: "/product-features", title: "Product Features - Our Platform", type: "Product page" },
      { path: "/blog/seo-guide", title: "Complete SEO Guide", type: "Blog post" },
      { path: "/pricing", title: "Pricing Plans", type: "Pricing page" },
      { path: "/contact", title: "Contact Us", type: "Contact page" },
      { path: "/about", title: "About Our Company", type: "About page" },
      { path: "/dashboard", title: "Analytics Dashboard", type: "Product page" },
      { path: "/blog/marketing-tips", title: "Marketing Tips", type: "Blog post" },
      { path: "/integrations", title: "Integrations", type: "Product page" },
    ];

    return pages.map((page, index) => ({
      id: randomUUID(),
      pagePath: page.path,
      pageTitle: page.title,
      pageviews: Math.floor(12000 - index * 1500 + Math.random() * 2000),
      uniquePageviews: Math.floor(8000 - index * 1000 + Math.random() * 1500),
      avgTimeOnPage: Math.floor(120 + Math.random() * 180),
      changePercent: index < 4 ? "15.3" : index === 2 ? "-3.2" : "8.7",
      date: new Date().toISOString().split('T')[0],
    }));
  }

  private generateSearchConsoleQueries(): SearchConsoleQuery[] {
    const queries = [
      { query: "marketing analytics dashboard", position: 3.2 },
      { query: "google analytics alternative", position: 5.8 },
      { query: "hubspot integration", position: 2.1 },
      { query: "seo performance tracking", position: 4.5 },
      { query: "lead generation tools", position: 6.2 },
      { query: "crm analytics", position: 3.8 },
      { query: "marketing automation", position: 4.9 },
      { query: "conversion tracking", position: 2.7 },
    ];

    return queries.map((q, index) => ({
      id: randomUUID(),
      query: q.query,
      clicks: Math.floor(3000 - index * 300 + Math.random() * 500),
      impressions: Math.floor(15000 - index * 1500 + Math.random() * 2000),
      ctr: ((Math.floor(3000 - index * 300) / Math.floor(15000 - index * 1500)) * 100).toFixed(2),
      position: q.position.toString(),
      changePercent: index < 3 ? "18.5" : index === 3 ? "-7.2" : "12.3",
      date: new Date().toISOString().split('T')[0],
    }));
  }

  private generateHubspotLeads(): HubspotLead[] {
    const leads = [
      { firstName: "Sarah", lastName: "Miller", email: "sarah.miller@enterprise.com", company: "Enterprise Corp", status: "Qualified", score: 85 },
      { firstName: "John", lastName: "Davis", email: "john.davis@smb.com", company: "SMB Solutions", status: "New", score: 45 },
      { firstName: "Lisa", lastName: "Wang", email: "lisa.wang@midmarket.com", company: "Mid-Market Inc", status: "Contacted", score: 65 },
      { firstName: "Mike", lastName: "Johnson", email: "mike.j@enterprise.com", company: "Big Enterprise", status: "Qualified", score: 92 },
      { firstName: "Emma", lastName: "Brown", email: "emma.brown@startup.com", company: "Startup Labs", status: "New", score: 38 },
    ];

    return leads.map((lead, index) => {
      const createdAt = new Date();
      createdAt.setHours(createdAt.getHours() - (index * 2 + 2));
      
      return {
        id: randomUUID(),
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        company: lead.company,
        leadStatus: lead.status,
        leadScore: lead.score,
        source: "Organic Search",
        createdAt,
      };
    });
  }

  private generateHubspotMetrics(): HubspotMetric[] {
    const metrics: HubspotMetric[] = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const newLeads = Math.floor(50 + Math.random() * 30);
      
      metrics.push({
        id: randomUUID(),
        date: date.toISOString().split('T')[0],
        newLeads,
        qualifiedLeads: Math.floor(newLeads * 0.6),
        opportunities: Math.floor(newLeads * 0.3),
        closedDeals: Math.floor(newLeads * 0.1),
        dealValue: (Math.floor(newLeads * 0.1) * 5000 + Math.random() * 2000).toFixed(2),
      });
    }
    
    return metrics;
  }
}

export const storage = new MemStorage();
