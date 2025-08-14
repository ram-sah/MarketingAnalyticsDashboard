import { TrendingUp, TrendingDown } from "lucide-react";

interface KeyMetricsProps {
  data?: {
    totalSessions: number;
    organicClicks: number;
    newLeads: number;
    conversionRate: string;
  };
}

export default function KeyMetrics({ data }: KeyMetricsProps) {
  if (!data) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-dashboard-text mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card-bg rounded-lg p-6 border border-gray-200 animate-pulse">
              <div className="h-4 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total Sessions",
      value: data.totalSessions?.toLocaleString() || "0",
      change: "+12.5%",
      trend: "up",
      color: "google-blue"
    },
    {
      title: "Organic Clicks", 
      value: data.organicClicks?.toLocaleString() || "0",
      change: "+8.3%",
      trend: "up",
      color: "google-blue"
    },
    {
      title: "New Leads",
      value: data.newLeads?.toLocaleString() || "0", 
      change: "+24.1%",
      trend: "up",
      color: "hubspot-orange"
    },
    {
      title: "Conversion Rate",
      value: `${data.conversionRate}%` || "0%",
      change: "-2.1%",
      trend: "down", 
      color: "google-green"
    }
  ];

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-dashboard-text mb-6">Key Performance Indicators</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-card-bg rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
              <div className={`w-2 h-2 bg-${metric.color} rounded-full`}></div>
            </div>
            <div className="space-y-2">
              <p className="text-3xl font-bold text-dashboard-text" data-testid={`text-metric-${index}`}>
                {metric.value}
              </p>
              <div className="flex items-center space-x-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-4 h-4 text-google-green" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${metric.trend === "up" ? "text-google-green" : "text-red-500"}`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500">vs last period</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}