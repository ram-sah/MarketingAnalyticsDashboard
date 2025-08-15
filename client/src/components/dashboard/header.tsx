export default function DashboardHeader() {
  const navigationItems = [
    'Overview',
    'Scorecard', 
    'Recommendations',
    'Opportunities',
    'Pillars',
    'Competitors',
    'Funnel',
    'Content'
  ];

  return (
    <header className="bg-slate-700 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <img 
                src="https://www.unitxlabs.com/wp-content/uploads/2025/01/black-square-256-favicon.png"
                alt="Unitx Lab AI Logo"
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-semibold">Unitx Lab AI</h1>
              <p className="text-sm text-gray-300">AI Integration, US.</p>
              <p className="text-xs text-gray-400">2025-08-10</p>
            </div>
          </div>
          
          <div className="bg-blue-400 text-white px-4 py-2 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">65</div>
              <div className="text-xs">Overall Score</div>
            </div>
          </div>
        </div>
        
        <nav>
          <div className="flex space-x-8">
            {navigationItems.map((item, index) => (
              <button
                key={item}
                className={`text-sm font-medium py-2 px-1 border-b-2 transition-colors ${
                  index === 0 
                    ? 'border-white text-white' 
                    : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
                }`}
                data-testid={`nav-${item.toLowerCase()}`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}