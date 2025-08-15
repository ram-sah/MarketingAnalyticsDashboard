import { useQuery } from "@tanstack/react-query";
import { DashboardHeader, TrafficChart } from "@/components/dashboard";

interface DashboardData {
  headerConfig: {
    clientLogoUrl: string;
    companyName: string;
    businessType: string;
    location: string;
    auditDate: string;
    overallScore: number;
  };
  trafficTrends: Array<{
    date: string;
    sessions: number;
    organicTraffic: number;
  }>;
}

export default function TrafficTrends() {
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
          <h1 className="text-3xl font-bold text-dashboard-text mb-2">Traffic Trends</h1>
          <p className="text-gray-600">Analyze website traffic patterns and growth over time</p>
        </div>

        {isLoading ? (
          <div className="h-96 bg-card-bg rounded-lg animate-pulse" />
        ) : (
          <TrafficChart data={dashboardData?.trafficTrends} />
        )}
      </main>
    </div>
  );
}