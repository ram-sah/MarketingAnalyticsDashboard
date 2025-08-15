import { useQuery } from "@tanstack/react-query";
import {
  DashboardHeader,
  ConnectionStatus,
  KeyMetrics,
  TrafficChart,
  FunnelChart,
  DataTables,
  CrossPlatformInsights,
  DashboardFooter
} from "@/components/dashboard";

interface DashboardData {
  headerConfig: {
    clientLogoUrl: string;
    companyName: string;
    businessType: string;
    location: string;
    auditDate: string;
    overallScore: number;
  };
  keyMetrics: {
    totalSessions: number;
    organicClicks: number;
    newLeads: number;
    conversionRate: string;
  };
  trafficTrends: Array<{
    date: string;
    sessions: number;
    organicTraffic: number;
  }>;
  topPages: Array<{
    pagePath: string;
    pageTitle: string;
    pageviews: number;
    changePercent: string;
  }>;
  topKeywords: Array<{
    query: string;
    clicks: number;
    position: string;
    changePercent: string;
  }>;
  recentLeads: Array<{
    firstName: string;
    lastName: string;
    company: string;
    leadStatus: string;
    createdAt: Date;
  }>;
  funnelData: {
    visitors: number;
    mqls: number;
    sqls: number;
    opportunities: number;
    customers: number;
  };
}

export default function Dashboard() {
  const { data: dashboardData, isLoading, error } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/overview"],
  });

  if (error) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-dashboard-text mb-2">Error Loading Dashboard</h1>
          <p className="text-gray-600">Failed to fetch analytics data. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg font-google text-dashboard-text">
      <DashboardHeader 
        clientLogoUrl={dashboardData?.headerConfig?.clientLogoUrl}
        companyName={dashboardData?.headerConfig?.companyName}
        businessType={dashboardData?.headerConfig?.businessType}
        location={dashboardData?.headerConfig?.location}
        auditDate={dashboardData?.headerConfig?.auditDate}
        overallScore={dashboardData?.headerConfig?.overallScore}
      />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section id="data-sources">
          <ConnectionStatus />
        </section>
        
        {isLoading ? (
          <div className="space-y-8">
            <div className="h-48 bg-card-bg rounded-lg animate-pulse" />
            <div className="h-96 bg-card-bg rounded-lg animate-pulse" />
            <div className="h-64 bg-card-bg rounded-lg animate-pulse" />
          </div>
        ) : (
          <>
            <section id="key-performance" className="mb-8">
              <KeyMetrics data={dashboardData?.keyMetrics} />
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <section id="traffic-trends">
                <TrafficChart data={dashboardData?.trafficTrends} />
              </section>
              <section id="funnel">
                <FunnelChart data={dashboardData?.funnelData} />
              </section>
            </div>
            
            <section id="top-pages" className="mb-8">
              <DataTables 
                topPages={dashboardData?.topPages}
                topKeywords={dashboardData?.topKeywords}
                recentLeads={dashboardData?.recentLeads}
              />
            </section>
            
            <section id="top-keywords" className="mb-8">
              {/* Keywords are included in DataTables above */}
            </section>
            
            <section id="recent-leads" className="mb-8">
              <DataTables 
                topPages={dashboardData?.topPages}
                topKeywords={dashboardData?.topKeywords}
                recentLeads={dashboardData?.recentLeads}
              />
            </section>
            
            <section id="cross-platform" className="mb-8">
              <CrossPlatformInsights />
            </section>
            
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                Last synced: <span>Today at {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span> • 
                <button 
                  className="text-google-blue hover:text-blue-700 underline ml-1"
                  data-testid="button-sync-now"
                  onClick={() => window.location.reload()}
                >
                  Sync now
                </button>
              </p>
            </div>
          </>
        )}
      </main>
      <DashboardFooter />
    </div>
  );
}
