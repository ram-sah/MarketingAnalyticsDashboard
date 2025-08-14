import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

interface TrafficChartProps {
  data?: Array<{
    date: string;
    sessions: number;
    organicTraffic: number;
  }>;
}

export default function TrafficChart({ data }: TrafficChartProps) {
  if (!data) {
    return (
      <div className="bg-card-bg rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-dashboard-text">Traffic Trends</h3>
        </div>
        <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
      </div>
    );
  }

  // Format data for chart (show last 7 days for better visibility)
  const chartData = data.slice(-7).map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="bg-card-bg rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-dashboard-text">Traffic Trends</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-google-blue rounded-full"></div>
            <span className="text-sm text-gray-600">Sessions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-google-green rounded-full"></div>
            <span className="text-sm text-gray-600">Organic</span>
          </div>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              tickFormatter={(value) => value.toLocaleString()}
            />
            <Line 
              type="monotone" 
              dataKey="sessions" 
              stroke="hsl(217, 91%, 60%)" 
              strokeWidth={2}
              dot={{ fill: "hsl(217, 91%, 60%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(217, 91%, 60%)", strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="organicTraffic" 
              stroke="hsl(142, 76%, 36%)" 
              strokeWidth={2}
              dot={{ fill: "hsl(142, 76%, 36%)", strokeWidth: 0, r: 4 }}
              activeDot={{ r: 6, stroke: "hsl(142, 76%, 36%)", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}