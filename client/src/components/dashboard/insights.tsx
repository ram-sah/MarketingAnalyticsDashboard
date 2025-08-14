import { CheckCircle, Info, Clock } from "lucide-react";

export default function CrossPlatformInsights() {
  const insights = [
    {
      icon: CheckCircle,
      title: "Traffic-to-Lead Correlation",
      description: "Your organic traffic increases directly correlate with lead generation, with a 0.85 correlation coefficient.",
      badge: "High Impact",
      badgeColor: "bg-blue-100 text-blue-800",
      detail: "+24% leads when traffic +30%",
      color: "blue"
    },
    {
      icon: Info,
      title: "Search Performance Impact",
      description: "Blog posts ranking in top 3 positions drive 78% more qualified leads than lower-ranking content.",
      badge: "Opportunity",
      badgeColor: "bg-orange-100 text-orange-800",
      detail: "Focus on positions 4-10",
      color: "orange"
    },
    {
      icon: Clock,
      title: "Best Converting Times",
      description: "Peak conversion periods: Tuesdays 10-11 AM and Thursdays 2-3 PM show 45% higher lead quality.",
      badge: "Actionable",
      badgeColor: "bg-green-100 text-green-800",
      detail: "Optimize ad schedule",
      color: "green"
    }
  ];

  return (
    <div className="bg-card-bg rounded-lg p-6 border border-gray-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-dashboard-text">Cross-Platform Insights</h3>
        <button 
          className="text-sm text-google-blue hover:text-blue-700"
          data-testid="button-generate-report"
        >
          Generate Report →
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const IconComponent = insight.icon;
          const borderColor = insight.color === 'blue' ? 'border-blue-200' : 
                             insight.color === 'orange' ? 'border-orange-200' : 'border-green-200';
          const bgColor = insight.color === 'blue' ? 'bg-blue-50' : 
                         insight.color === 'orange' ? 'bg-orange-50' : 'bg-green-50';
          const iconColor = insight.color === 'blue' ? 'text-google-blue' : 
                           insight.color === 'orange' ? 'text-hubspot-orange' : 'text-google-green';
          
          return (
            <div key={index} className={`${bgColor} rounded-lg p-4 border ${borderColor}`}>
              <div className="flex items-center space-x-2 mb-2">
                <IconComponent className={`w-5 h-5 ${iconColor}`} />
                <h4 className="font-semibold text-dashboard-text" data-testid={`text-insight-title-${index}`}>
                  {insight.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600 mb-3" data-testid={`text-insight-description-${index}`}>
                {insight.description}
              </p>
              <div className="flex items-center space-x-2">
                <span className={`text-xs px-2 py-1 rounded-full ${insight.badgeColor}`}>
                  {insight.badge}
                </span>
                <span className="text-xs text-gray-500" data-testid={`text-insight-detail-${index}`}>
                  {insight.detail}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}