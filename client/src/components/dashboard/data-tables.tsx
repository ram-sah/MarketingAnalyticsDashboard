import { TrendingUp, TrendingDown } from "lucide-react";

interface DataTablesProps {
  topPages?: Array<{
    pagePath: string;
    pageTitle: string;
    pageviews: number;
    changePercent: string;
  }>;
  topKeywords?: Array<{
    query: string;
    clicks: number;
    position: string;
    changePercent: string;
  }>;
  recentLeads?: Array<{
    firstName: string;
    lastName: string;
    company: string;
    leadStatus: string;
    createdAt: Date;
  }>;
}

export default function DataTables({ topPages, topKeywords, recentLeads }: DataTablesProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getCompanyType = (company: string) => {
    if (company?.toLowerCase().includes('enterprise')) return 'Enterprise';
    if (company?.toLowerCase().includes('startup')) return 'SMB';
    return 'Mid-market';
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
      {/* Top Pages */}
      <div className="bg-card-bg rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dashboard-text">Top Performing Pages</h3>
            <div className="w-2 h-2 bg-google-blue rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Google Analytics 4</p>
        </div>
        <div className="p-6">
          {topPages ? (
            <div className="space-y-4">
              {topPages.slice(0, 5).map((page, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dashboard-text" data-testid={`text-page-path-${index}`}>
                      {page.pagePath}
                    </p>
                    <p className="text-xs text-gray-500">Product page</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dashboard-text" data-testid={`text-page-views-${index}`}>
                      {page.pageviews.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end">
                      {parseFloat(page.changePercent) >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-google-green mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <p className={`text-xs ${parseFloat(page.changePercent) >= 0 ? 'text-google-green' : 'text-red-500'}`}>
                        {page.changePercent}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Keywords */}
      <div className="bg-card-bg rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dashboard-text">Top Search Keywords</h3>
            <div className="w-2 h-2 bg-google-blue rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">Google Search Console</p>
        </div>
        <div className="p-6">
          {topKeywords ? (
            <div className="space-y-4">
              {topKeywords.slice(0, 5).map((keyword, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-dashboard-text" data-testid={`text-keyword-${index}`}>
                      {keyword.query}
                    </p>
                    <p className="text-xs text-gray-500">Position {keyword.position}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-dashboard-text" data-testid={`text-keyword-clicks-${index}`}>
                      {keyword.clicks.toLocaleString()}
                    </p>
                    <div className="flex items-center justify-end">
                      {parseFloat(keyword.changePercent) >= 0 ? (
                        <TrendingUp className="w-3 h-3 text-google-green mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <p className={`text-xs ${parseFloat(keyword.changePercent) >= 0 ? 'text-google-green' : 'text-red-500'}`}>
                        {keyword.changePercent}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Leads */}
      <div className="bg-card-bg rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-dashboard-text">Recent Leads</h3>
            <div className="w-2 h-2 bg-hubspot-orange rounded-full"></div>
          </div>
          <p className="text-sm text-gray-600 mt-1">HubSpot CRM</p>
        </div>
        <div className="p-6">
          {recentLeads ? (
            <div className="space-y-4">
              {recentLeads.slice(0, 5).map((lead, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-gray-600">
                        {lead.firstName[0]}{lead.lastName[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-dashboard-text" data-testid={`text-lead-name-${index}`}>
                        {lead.firstName} {lead.lastName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {getCompanyType(lead.company || '')} • {getTimeAgo(lead.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(lead.leadStatus)}`}>
                    {lead.leadStatus}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}