import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Database, Globe, Users, BarChart3 } from "lucide-react";

interface DataSource {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected" | "error";
  lastSync: string;
  recordCount: number;
  description: string;
  icon: any;
}

const dataSources: DataSource[] = [
  {
    id: "ga4",
    name: "Google Analytics 4",
    type: "Web Analytics",
    status: "connected",
    lastSync: "2 minutes ago",
    recordCount: 125234,
    description: "Website traffic, user behavior, and conversion data",
    icon: BarChart3
  },
  {
    id: "gsc",
    name: "Google Search Console",
    type: "Search Analytics",
    status: "connected", 
    lastSync: "5 minutes ago",
    recordCount: 8945,
    description: "Search performance, keywords, and click-through rates",
    icon: Globe
  },
  {
    id: "hubspot",
    name: "HubSpot CRM",
    type: "Customer Relationship",
    status: "connected",
    lastSync: "1 hour ago", 
    recordCount: 342,
    description: "Lead management, contact data, and sales pipeline",
    icon: Users
  },
  {
    id: "meta",
    name: "Meta Ads",
    type: "Advertising",
    status: "disconnected",
    lastSync: "Never",
    recordCount: 0,
    description: "Facebook and Instagram advertising performance data",
    icon: Database
  }
];

interface DashboardData {
  headerConfig: {
    clientLogoUrl: string;
    companyName: string;
    businessType: string;
    location: string;
    auditDate: string;
    overallScore: number;
  };
}

export default function DataSources() {
  const { data: dashboardData } = useQuery<DashboardData>({
    queryKey: ["/api/dashboard/overview"],
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge className="bg-green-100 text-green-800">Connected</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Disconnected</Badge>;
    }
  };

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
          <h1 className="text-3xl font-bold text-dashboard-text mb-2">Data Sources</h1>
          <p className="text-gray-600">Manage your connected data sources and integration status</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((source) => {
            const IconComponent = source.icon;
            return (
              <Card key={source.id} className="relative">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <p className="text-sm text-gray-500">{source.type}</p>
                      </div>
                    </div>
                    {getStatusIcon(source.status)}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{source.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Status:</span>
                      {getStatusBadge(source.status)}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Last Sync:</span>
                      <span className="text-sm text-dashboard-text">{source.lastSync}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Records:</span>
                      <span className="text-sm text-dashboard-text font-medium">
                        {source.recordCount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <button
                      className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        source.status === "connected"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      }`}
                      data-testid={`button-${source.status === "connected" ? "manage" : "connect"}-${source.id}`}
                    >
                      {source.status === "connected" ? "Manage" : "Connect"}
                    </button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Data Integration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">3</div>
                  <div className="text-sm text-gray-500">Connected Sources</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">134,521</div>
                  <div className="text-sm text-gray-500">Total Records</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">2 min</div>
                  <div className="text-sm text-gray-500">Avg Sync Time</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}