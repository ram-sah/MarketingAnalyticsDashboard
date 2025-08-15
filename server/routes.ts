import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard overview endpoint
  app.get("/api/dashboard/overview", async (req, res) => {
    try {
      const [ga4Sessions, ga4Pages, searchQueries, hubspotLeads, hubspotMetrics] = await Promise.all([
        storage.getGA4Sessions(30),
        storage.getGA4Pages(5),
        storage.getSearchConsoleQueries(5),
        storage.getHubspotLeads(5),
        storage.getHubspotMetrics(30)
      ]);

      // Calculate totals and trends
      const totalSessions = ga4Sessions.reduce((sum, session) => sum + session.sessions, 0);
      const totalOrganicClicks = searchQueries.reduce((sum, query) => sum + query.clicks, 0);
      const totalNewLeads = hubspotMetrics.reduce((sum, metric) => sum + metric.newLeads, 0);
      
      // Calculate conversion rate from latest session data
      const latestSession = ga4Sessions[ga4Sessions.length - 1];
      const conversionRate = latestSession?.conversionRate || "3.24";

      // Calculate overall score based on various metrics
      const overallScore = Math.min(100, Math.floor(
        (totalSessions / 1000) * 20 + 
        (totalOrganicClicks / 100) * 15 + 
        (totalNewLeads / 10) * 25 + 
        parseFloat(conversionRate) * 10 + 
        30 // Base score
      ));

      const overview = {
        headerConfig: {
          clientLogoUrl: "https://www.unitxlabs.com/wp-content/uploads/2025/01/black-square-256-favicon.png",
          companyName: "Unitx Lab AI",
          businessType: "AI Integration",
          location: "US",
          auditDate: new Date().toISOString().split('T')[0],
          overallScore: overallScore
        },
        keyMetrics: {
          totalSessions,
          organicClicks: totalOrganicClicks,
          newLeads: totalNewLeads,
          conversionRate
        },
        trafficTrends: ga4Sessions.map(session => ({
          date: session.date,
          sessions: session.sessions,
          organicTraffic: Math.floor(session.sessions * 0.65) // Estimate organic portion
        })),
        topPages: ga4Pages,
        topKeywords: searchQueries,
        recentLeads: hubspotLeads,
        funnelData: {
          visitors: 100,
          mqls: 35,
          sqls: 18,
          opportunities: 12,
          customers: 8
        }
      };

      res.json(overview);
    } catch (error) {
      console.error("Error fetching dashboard overview:", error);
      res.status(500).json({ message: "Failed to fetch dashboard data" });
    }
  });

  // GA4 specific endpoints
  app.get("/api/ga4/sessions", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const sessions = await storage.getGA4Sessions(days);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GA4 sessions" });
    }
  });

  app.get("/api/ga4/pages", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const pages = await storage.getGA4Pages(limit);
      res.json(pages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch GA4 pages" });
    }
  });

  // Search Console endpoints
  app.get("/api/search-console/queries", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const queries = await storage.getSearchConsoleQueries(limit);
      res.json(queries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Search Console data" });
    }
  });

  // HubSpot endpoints
  app.get("/api/hubspot/leads", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const leads = await storage.getHubspotLeads(limit);
      res.json(leads);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch HubSpot leads" });
    }
  });

  app.get("/api/hubspot/metrics", async (req, res) => {
    try {
      const days = parseInt(req.query.days as string) || 30;
      const metrics = await storage.getHubspotMetrics(days);
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch HubSpot metrics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
