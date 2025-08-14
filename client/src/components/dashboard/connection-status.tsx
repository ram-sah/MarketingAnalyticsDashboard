export default function ConnectionStatus() {
  const connections = [
    {
      name: "Google Analytics 4",
      color: "bg-google-blue",
      status: "Connected"
    },
    {
      name: "Search Console", 
      color: "bg-google-blue",
      status: "Connected"
    },
    {
      name: "HubSpot CRM",
      color: "bg-hubspot-orange", 
      status: "Connected"
    }
  ];

  return (
    <div className="mb-8">
      <div className="bg-card-bg rounded-lg p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-dashboard-text mb-4">Data Sources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {connections.map((connection, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-3 h-3 bg-google-green rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 ${connection.color} rounded`}></div>
                <span className="font-medium text-sm" data-testid={`text-connection-${index}`}>{connection.name}</span>
              </div>
              <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full ml-auto">
                {connection.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}