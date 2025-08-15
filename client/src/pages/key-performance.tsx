import { useQuery } from "@tanstack/react-query";
import { DashboardHeader, KeyMetrics } from "@/components/dashboard";

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
}

export default function KeyPerformance() {
  const { data: dashboardData, isLoading } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/overview"],
  });

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dashboard-text mb-2">Key Performance Metrics</h1>
          <p className="text-gray-600">Monitor your most important business metrics and KPIs</p>
        </div>

        {isLoading ? (
          <div className="h-48 bg-card-bg rounded-lg animate-pulse" />
        ) : (
          <KeyMetrics data={dashboardData?.keyMetrics} />
        )}
      </main>
    </div>
  );
}