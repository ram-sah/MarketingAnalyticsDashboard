import { BarChart3, Calendar, RefreshCw, User } from "lucide-react";

export default function DashboardHeader() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="bg-card-bg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-google-blue rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-dashboard-text">Marketing Analytics</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Last 30 days</span>
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
            
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={handleRefresh}
              data-testid="button-refresh-data"
            >
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
            
            <div className="w-8 h-8 bg-google-blue rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}