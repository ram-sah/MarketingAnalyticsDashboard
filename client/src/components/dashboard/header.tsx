import { useLocation, Link } from "wouter";

interface DashboardHeaderProps {
  clientLogoUrl?: string;
  companyName?: string;
  businessType?: string;
  location?: string;
  auditDate?: string;
  overallScore?: number;
  navigationItems?: Array<{
    label: string;
    path: string;
  }>;
}

export default function DashboardHeader({
  clientLogoUrl = "https://www.unitxlabs.com/wp-content/uploads/2025/01/black-square-256-favicon.png",
  companyName = "Unitx Lab AI",
  businessType = "AI Integration",
  location = "US",
  auditDate = "2025-08-10",
  overallScore = 65,
  navigationItems = [
    { label: 'Data Sources', path: '#data-sources' },
    { label: 'Key Performance', path: '#key-performance' }, 
    { label: 'Traffic Trends', path: '#traffic-trends' },
    { label: 'Funnel', path: '#funnel' },
    { label: 'Top Performing Pages', path: '#top-pages' },
    { label: 'Top Search Keywords', path: '#top-keywords' },
    { label: 'Cross-Platform', path: '#cross-platform' }
  ]
}: DashboardHeaderProps) {
  const [currentLocation] = useLocation();

  return (
    <header className="bg-slate-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <img 
                src={clientLogoUrl}
                alt={`${companyName} Logo`}
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">{companyName}</h1>
              <p className="text-sm text-gray-300">{businessType}, <span>{location}.</span></p>
              <p className="text-xs text-gray-400">{auditDate}</p>
            </div>
          </div>
          
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">{overallScore}</div>
              <div className="text-xs">Overall Score</div>
            </div>
          </div>
        </div>
        
        <nav>
          <div className="flex space-x-8">
            {navigationItems.map((item, index) => {
              const isActive = index === 0; // Default first item as active
              
              const handleClick = (e: React.MouseEvent) => {
                e.preventDefault();
                const targetId = item.path.replace('#', '');
                const element = document.getElementById(targetId);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              };
              
              return (
                <button
                  key={item.path}
                  onClick={handleClick}
                  className={`text-sm font-medium py-2 px-1 border-b-2 transition-colors ${
                    isActive
                      ? 'border-white text-white' 
                      : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}